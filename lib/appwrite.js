import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: "com.musicom.app",
  projectId: '6713a7c60020510b2cd6',
  databaseId: '6713abf4003b3cdd04bc',
  userCollectionId: '678f9ca8002ecfe4662d',
  storageId: ''
}

// Init Appwrite Client
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// CREATE USER (registrace)
export async function createUser(email, password, username, firstname, lastname) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed.");

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        firstname: firstname,
        lastname: lastname,
        avatar: avatarUrl,
      }
    );
    
    console.log("New user profile created:", newUser);

    return newUser;
  } catch (error) {
    throw new Error(error.message || "User registration failed.");
  }
}

// SIGN IN (bez opakovaného přihlášení, pokud session existuje)
export async function signIn(email, password) {
  try {
    // Zjisti, zda už není aktivní session
    try {
      const existing = await account.get();
      console.log("✅ Session already exists. Skipping login.");
      return existing;
    } catch (err) {
      if (err.code !== 401) {
        console.error("❌ Chyba při kontrole session:", err);
        throw new Error("Unknown session error.");
      }
      // Pokračuj – session není aktivní
    }

    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Session successfully created.");
    return session;
  } catch (error) {
    console.error("❌ signIn error:", error.message);
    throw new Error(error.message || "Failed to sign in.");
  }
}

// GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error.message || "Failed to get account.");
  }
}

// GET CURRENT USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("Account not found.");

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("User document not found.");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("❌ getCurrentUser error:", error.message);
    return null;
  }
}

// SIGN OUT
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    console.log("✅ Session deleted.");
    return session;
  } catch (error) {
    throw new Error(error.message || "Failed to sign out.");
  }
}

// GET USER PROFILE
export async function getUserProfile() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");

    return {
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      username: currentUser.username,
      avatar: currentUser.avatar,
      bio: currentUser.bio || "",
      tracks: currentUser.tracks || 0,
      fans: currentUser.fans || 0,
      connections: currentUser.connections || 0,
      instruments: currentUser.chosenInstruments || ["Not set"],
      genres: currentUser.chosenGenres || ["Not set"],
      location: currentUser.country && currentUser.state
        ? `${currentUser.country}, ${currentUser.state}`
        : "Location not set",
      age: currentUser.birthYear
        ? new Date().getFullYear() - currentUser.birthYear
        : "Unknown",
      gender: currentUser.chosenGender || "Not set",
    };
  } catch (error) {
    console.error("❌ Error fetching user profile:", error.message);
    return null;
  }
}
