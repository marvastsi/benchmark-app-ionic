import { Storage } from "@ionic/storage";
import { Config } from "../models/Config";

const storage = new Storage();
await storage.create();

const saveConfig = async (config: Config) => {
  try {
    await storage.set(
      APP_CONFIG,
      JSON.stringify(config),
    );
  } catch (error) {
    console.log(`Error: Saving APP_CONFIG`);
    throw error;
  }
};

const retrieveConfig = async (): Promise<Config> => {
  try {
    const value = await storage.get(APP_CONFIG);

    return JSON.parse(value) as Config;
  } catch (error) {
    console.log(`Error: Retrieving APP_CONFIG`);
    throw error;
  }
};

const APP_CONFIG = "APP_CONFIG";

export { retrieveConfig, saveConfig };
