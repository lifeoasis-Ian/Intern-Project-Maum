import axios from "axios";
import {Platform} from "react-native";

let backendUrl = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

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
}
