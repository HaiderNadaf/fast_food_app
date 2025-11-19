// import { CreateUserParams } from "@/type";
// import {
//   Account,
//   Avatars,
//   Client,
//   Databases,
//   ID,
//   Query,
//   Storage,
// } from "react-native-appwrite";

// // --------------------------------------
// // APPWRITE CONFIG
// // --------------------------------------
// export const appwriterConfig = {
//   endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
//   platform: "com.hmn.foodordering",
//   projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
//   busketId: "6918203c001d8f88f7b3", // YOUR bucket
//   databaseId: "app9900768505", // YOUR database
//   userCollectionId: "user", // YOUR collection
//   categoriesCollectionId: "categories", // YOUR collection
//   menuCollectionId: "menu", // YOUR collection
//   customizationsCollectionId: "customizations", // YOUR collection
//   menucustomizationsCollectionId: "menu_customizations", // YOUR collection
// };

// // --------------------------------------
// // CLIENT
// // --------------------------------------
// export const client = new Client();

// client
//   .setEndpoint(appwriterConfig.endpoint)
//   .setProject(appwriterConfig.projectId)
//   .setPlatform(appwriterConfig.platform);

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// const avatars = new Avatars(client);

// // --------------------------------------
// // CREATE USER (FULLY FIXED)
// // --------------------------------------
// export const creatUser = async ({
//   email,
//   password,
//   name,
// }: CreateUserParams) => {
//   try {
//     // --------------------------------------
//     // SANITIZE INPUTS (Fixes your error)
//     // --------------------------------------
//     email = email.trim().toLowerCase(); // Remove spaces + lowercase
//     name = name.trim();
//     password = password.trim(); // Remove accidental spaces

//     // Optional: validate password length
//     if (password.length < 8) {
//       throw new Error("Password must be at least 8 characters.");
//     }

//     // 1️⃣ Create Appwrite Auth User
//     const newAccount = await account.create(ID.unique(), email, password, name);

//     if (!newAccount) {
//       throw new Error("Account creation failed.");
//     }

//     // 2️⃣ Auto login
//     await signIn({ email, password });

//     // 3️⃣ Get avatar
//     const avatarUrl = avatars.getInitialsURL(name);

//     // 4️⃣ Create user document
//     const newUserDoc = await databases.createDocument(
//       appwriterConfig.databaseId,
//       appwriterConfig.userCollectionId,
//       ID.unique(),
//       {
//         email,
//         name,
//         accountId: newAccount.$id,
//         avatar: avatarUrl,
//       }
//     );

//     return newUserDoc;
//   } catch (error: any) {
//     console.log("Create User Error:", error);
//     throw new Error("Failed to create user: " + (error?.message || error));
//   }
// };

// // --------------------------------------
// // SIGN IN
// // --------------------------------------
// export const signIn = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     email = email.trim().toLowerCase();
//     password = password.trim();

//     return await account.createEmailPasswordSession(email, password);
//   } catch (error: any) {
//     console.log("Sign In Error:", error);
//     throw new Error("Failed to sign in: " + (error?.message || error));
//   }
// };

// // --------------------------------------
// // SAFE GET CURRENT USER
// // --------------------------------------
// export const getCurrentUser = async () => {
//   try {
//     // 1️⃣ Check if session exists
//     const sessions = await account.listSessions();

//     if (sessions.total === 0) {
//       return null; // No user logged in
//     }

//     // 2️⃣ Fetch the account
//     const currentAccount = await account.get();

//     // 3️⃣ Fetch the user's DB document
//     const userDocs = await databases.listDocuments(
//       appwriterConfig.databaseId,
//       appwriterConfig.userCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     if (userDocs.documents.length === 0) {
//       return null;
//     }

//     return userDocs.documents[0];
//   } catch (error) {
//     console.log("getCurrentUser Error:", error);
//     return null;
//   }
// };

import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.hmn.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  bucketId: "6918203c001d8f88f7b3", // YOUR bucket
  databaseId: "app9900768505", // YOUR database
  userCollectionId: "user", // YOUR collection
  categoriesCollectionId: "categories", // YOUR collection
  menuCollectionId: "menu", // YOUR collection
  customizationsCollectionId: "customizations", // YOUR collection
  menuCustomizationsCollectionId: "menu_customizations", // YOUR collection
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl }
    );
  } catch (e) {
    throw new Error(e as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    return categories.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};
