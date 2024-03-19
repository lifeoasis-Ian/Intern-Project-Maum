import axios from "axios";
import {Platform} from "react-native";

let backendUrl = Platform.OS === "ios" ? "localhost" : "10.170.130.117";

export class GetUserDataService {
  async getUserLanguage(token: string) {
    try {
      const response = await axios.post(
        `http://${backendUrl}:3000/getLanguage`,
        {
          token: token,
        },
      );
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getUserAvatar(token: string) {
    try {
      const response = await axios.post(`http://${backendUrl}:3000/getAvatar`, {
        token: token,
      });
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getUserNickname(token: string) {
    try {
      const response = await axios.post(
        `http://${backendUrl}:3000/getNickname`,
        {
          token: token,
        },
      );
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async getUserMannerScore(token: string) {
    try {
      const response = await axios.post(`http://${backendUrl}:3000/getManner`, {
        token: token,
      });
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
}
