import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {backendUrl} from "./index.ts";

export class SaveService {
  async saveLanguage(language: string, accessToken: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/saveLanguage`, {
        language: language,
        token: accessToken,
      });
    } catch (error) {
      throw error;
    }
  }

  async saveToken(token: string) {
    await AsyncStorage.setItem("token", token);
  }
}
