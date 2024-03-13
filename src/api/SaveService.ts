import axios from "axios";
import {Platform} from "react-native";

let backendUrl = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

export class SaveService {
  async saveData(phoneNumber: string, countryCode: string, language: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/language`, {
        language: language,
        phoneNumber: phoneNumber,
        countryCode: countryCode,
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
