import conf from '../conf/conf';
import { Client,Users } from 'node-appwrite';

export class UserService {
    client = new Client();
    users;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)
            .setKey(conf.appwriteUserReadKey);

        this.users = new Users(this.client);
    }

    // Correct method to get a user by ID
    async getUserById(userId) {
        try {
            const user = await this.users.get(userId);  // Using  users.get() to fetch a specific user
            return user;
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }
}

const userService = new UserService();

export default userService;
