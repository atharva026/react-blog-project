import conf from '../conf/conf';
import { Client, Account, ID} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // If account creation is successful, log in automatically
                return this.login({ email, password });
            }
            
            return userAccount;
        } catch (error) {
            console.error("Account creation error:", error);
            // throw new Error("Failed to create account");
            throw new Error(error.message);

        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login error:", error);
            throw new Error(error.message);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Logout error:", error);
            // throw new Error("Logout failed");
            throw new Error(error.message);

        }
    }
}

const authService = new AuthService();

export default authService;