import {Storage} from "@ionic/storage";
import { Token } from "../models/Credentials";

const storage = new Storage();
await storage.create();
// storage.setEncryptionKey('s3cR3t');

const saveToken = async (token: Token) => {
    try {
        await storage.set(
            API_TOKEN,
            token.value
        );
    } catch (error) {
        console.log(`Error: Saving API_TOKEN`);
    }
};

const retrieveToken = async (): Promise<Token> => {
    try {
        const value = await storage.get(API_TOKEN);
        if (value !== null) {
            console.log(`API_TOKEN: ${value}`);
        }
        return { type: "Bearer", value: value } as Token;
    } catch (error) {
        console.log(`Error: Retrieving API_TOKEN`);
        throw error;
    }
};

const API_TOKEN = "API_TOKEN";

export { retrieveToken, saveToken };

