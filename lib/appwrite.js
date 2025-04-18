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

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);

const databases = new Databases(client);

export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Sign In
export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Account
  export async function getAccount() {
    try {
  
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;

  
      const currentUser = await databases.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Sign Out
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  /*Získání profilových údajů*/
  export async function getUserProfile() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error("User not found");

        return {
            username: currentUser.username,
            avatar: currentUser.avatar,
            bio: currentUser.bio || "No bio available",
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
        console.error("Error fetching user profile:", error);
        return null;
    }
}

  