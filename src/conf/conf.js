const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteStorageID : String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    appwriteUserReadKey : String(import.meta.env.VITE_USER_READ_KEY),
}

export default conf;