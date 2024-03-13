import axios from "axios";
import {Platform} from "react-native";

let backendUrl = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

export class AuthService {
  async sendPhoneNumber() {
    try {
      return await axios.post(`http://${backendUrl}:3000/phone`);
    } catch (error) {
      console.error(error);
    }
  }

  async sendAuthCode(authCode: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/authcode`, {
        code: authCode,
      });
    } catch (error: any) {
      if (error.response && error.response.status === 405) {
        return 405;
      } else if (error.response && error.response.status === 429) {
        return 429;
      }
    }
  }

  async reSendData() {
    try {
      const response = await axios.get(`http://${backendUrl}:3000/resend`);
      if (response.status === 200) {
        return 200;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
