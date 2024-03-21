import axios from "axios";
import {Platform} from "react-native";
import {backendUrl} from "./AuthService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class SaveService {
  async saveLanguage(language: string, accessToken: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/saveLanguage`, {
        language: language,
        token: accessToken,
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async saveToken(token: string) {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  }
}
