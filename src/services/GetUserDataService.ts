import axios from "axios";
import {backendUrl} from "./AuthService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class GetUserDataService {
  async getUserLanguage(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getLanguage`, {
        token: token,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getUserAvatar(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getAvatar`, {
        token: token,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getUserNickname(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getNickname`, {
        token: token,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getUserMannerScore(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getManner`, {
        token: token,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getToken(key: string) {
    const res = await AsyncStorage.getItem(key);
    if (res !== null) {
      return res;
    } else {
      return "";
    }
  }
}
