import { Client, Account, Databases, ID } from 'react-native-appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6a59554d0001a47025eb')
    .setPlatform('com.robin.musicom');

export const account = new Account(client);
export const databases = new Databases(client);

const DATABASE_ID = '6a5959450038d9095201';
const PROFILES_COLLECTION_ID = 'profiles';

export const handleSignUp = async (email, password, username, firstName, lastName) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            firstName + " " + lastName
        );

        await account.createEmailPasswordSession(email, password);

        const accountId = newAccount.$id;

        const newProfile = await databases.createDocument(
            DATABASE_ID,
            PROFILES_COLLECTION_ID,
            ID.unique(),
            {
                accountId,
                username,
                firstName,
                lastName,
                role: 'user',
            }
        );

        return newProfile;
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};