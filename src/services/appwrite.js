import { Client, Account, Storage, Databases, Functions } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // <-- FIXED

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
export default client;