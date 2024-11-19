import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Create a new post document
    async createPost({ title, slug, content, img_url, status, userId,username }) {
        try {
            const documentId = `${slug}-${ID.unique()}`;
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                documentId,
                {
                    title,
                    content,
                    img_url,
                    status,
                    userId,
                    username
                }
            );
        } catch (error) {
            console.error("Error creating post:", error);
    
            return {
                success: false,
                message: error.message || "Failed to create post",
            };
        }
    }

    // Update an existing post document
    async updatePost(slug, { title, content, img_url, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    img_url,
                    status
                }
            );
        } catch (error) {
            console.error("Error updating post:", error);
            return null;
        }
    }

    // Delete a post document
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            );
            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }

    // Retrieve a single post by slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            );
        } catch (error) {
            console.error("Error retrieving post:", error);
            return null;
        }
    }

    // Retrieve all posts with active status
    async getAllPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                [Query.equal("status", "active")]
            );
        } catch (error) {
            console.error("Error retrieving all posts:", error);
            return null;
        }
    }

    async getAllUserPosts(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                [Query.equal("userId", userId)]
            );
        } catch (error) {
            console.error("Error retrieving all posts:", error);
            return null;
        }
    }

    // Upload a file to storage
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteStorageID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    }

    // Delete a file from storage
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteStorageID,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    }

    // Get a preview URL for a file
    getFilePreview(fileId) {
        // console.log('fileId', fileId)
        return this.storage.getFilePreview(
            conf.appwriteStorageID,
            fileId
        );
    }
}

const service = new Service();
export default service;