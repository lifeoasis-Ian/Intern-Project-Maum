import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {backendUrl} from "../index.ts";
import {StatusCode} from "../../utils/StatusCode.ts";
import {asyncDispatch} from "../../redux/actions/types.ts";
import {fetchRegisteredUser} from "../../redux/actions/account/thunks.ts";

export class AuthenticationService {
  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem("token");
    return !!token;
  }

  async getSavedToken() {
    return await AsyncStorage.getItem("token");
  }

  async searchUserByToken(token: string) {
    const resultUserByToken = await axios.post(
      `http://${backendUrl}:3000/searchUserByToken`,
      {
        token: token,
      },
    );
    return !!resultUserByToken.data.phone;
  }
  async getAuthCode() {
    try {
      const response = await axios.post(`http://${backendUrl}:3000/phone`);
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
      console.log(resultChecking);
      if (resultChecking.status === StatusCode.SUCCESS_CODE) {
        return resultChecking;
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
