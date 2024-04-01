import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosResponse} from "axios";
import {backendUrl} from "../index.ts";
import {StatusCode} from "../../utils/StatusCode.ts";

export class AuthenticationService {
  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem("token");
    return !!token;
  }

  async getSavedToken(): Promise<string | null> {
    return await AsyncStorage.getItem("token");
  }

  async getAuthCode() {
    try {
      const response = await axios.post(`http://${backendUrl}:3000/sendCode`);

      if (response.status === StatusCode.SUCCESS_CODE) {
        return true;
      }
    } catch (error: any) {
      if (error.response.status === StatusCode.TRY_OVER_ERROR_CODE_NUM) {
        throw new Error(StatusCode.TRY_OVER_ERROR_CODE);
      }
      throw new Error("Server Error!");
    }
  }

  async checkAuthCode(
    authCode: string,
    phoneNumber: string,
    countryCode: string,
  ) {
    try {
      const resultChecking = await axios.post(
        `http://${backendUrl}:3000/verifyAuthCode`,
        {
          code: authCode,
          phoneNumber: phoneNumber,
          countryCode: countryCode,
        },
      );

      if (resultChecking.status === StatusCode.SUCCESS_CODE) {
        return resultChecking.data.token;
      }
    } catch (error: any) {
      if (error.response.status === StatusCode.TRY_OVER_ERROR_CODE_NUM) {
        throw new Error(StatusCode.TRY_OVER_ERROR_CODE);
      } else if (
        error.response.status === StatusCode.NOT_MATCH_AUTHCODE_ERROR_CODE_NUM
      ) {
        throw new Error(StatusCode.NOT_MATCH_AUTHCODE_ERROR_CODE);
      }
    }
  }

  async saveTokenAsyncStorage(token: string) {
    await AsyncStorage.setItem("token", token);
  }
}
