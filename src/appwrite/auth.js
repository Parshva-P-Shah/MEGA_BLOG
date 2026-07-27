import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }) {
    try {
      const useraccount = await this.account.create(ID.unique(),email,password,name);
      if (useraccount) {
        return this.login({email, password});
      } else {
        return useraccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  
  async getUser() {
    try {
      return await this.account.get()
      } catch (error) {
      console.log("Appwrite serive :: getUser :: error", error);
    }
  }
  
  async logout() {
    try {
      return await this.account.deleteSessions();

    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);;
    }
  }
}
const authService = new AuthService();
export default authService;
