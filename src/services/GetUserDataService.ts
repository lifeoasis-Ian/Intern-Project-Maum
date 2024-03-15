import axios from "axios";
import {Platform} from "react-native";

let backendUrl = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

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
}
