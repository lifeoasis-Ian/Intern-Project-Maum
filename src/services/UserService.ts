import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {backendUrl} from "./index.ts";

export class UserService {
  async getUserLanguage(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getLanguage`, {
        token: token,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserAvatar(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getAvatar`, {
        token: token,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserNickname(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getNickname`, {
        token: token,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserMannerScore(token: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/getManner`, {
        token: token,
      });
    } catch (error) {
      throw error;
    }
  }

  async getToken() {
    const res = await AsyncStorage.getItem("token");
    if (res !== null) {
      return res;
    } else {
      return "";
    }
  }
}
