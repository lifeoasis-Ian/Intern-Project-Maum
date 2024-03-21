import axios from "axios";
import {Platform} from "react-native";

export let backendUrl = Platform.OS === "ios" ? "localhost" : "10.170.130.166";

export class AuthService {
  async sendPhoneNumber() {
    console.log(backendUrl);
    try {
      return await axios.post(`http://${backendUrl}:3000/phone`);
    } catch (error: any) {
      return error.response.status;
    }
  }

  async sendAuthCode(
    authCode: string,
    phoneNumber: string,
    countryCode: string,
  ) {
    try {
      const response = await axios.post(`http://${backendUrl}:3000/authcode`, {
        code: authCode,
        phoneNumber: phoneNumber,
        countryCode: countryCode,
      });
      return response;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      } else {
        return {
          status: 500,
        };
      }
    }
  }

  async reSendData() {
    try {
      const response = await axios.get(`http://${backendUrl}:3000/resend`);
      if (response.status === 200) {
        return 200;
      }
    } catch (error: any) {
      return error.response.status;
    }
  }
}
