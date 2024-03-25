import axios from "axios";
import {
  backendUrl,
  userService,
  permissionService,
  saveService,
} from "./index.ts";
import {StatusCode} from "../utils/StatusCode.ts";

export class AuthService {
  async checkAuthCodeAndReturnPage(
    authCode: string,
    phoneNumber: string,
    countryCode: string,
  ) {
    try {
      const resultChecking = await axios.post(
        `http://${backendUrl}:3000/authcode`,
        {
          code: authCode,
          phoneNumber: phoneNumber,
          countryCode: countryCode,
        },
      );
      if (resultChecking.status === StatusCode.SUCCESS_CODE) {
        const accessToken: string = resultChecking.data.token;
        await saveService.saveToken(accessToken);
        const resultGetLanguage = await userService.getUserLanguage(
          accessToken,
        );
        const savedLanguage = resultGetLanguage.data.language;
        const isPermissionSetting =
          await permissionService.checkAndRequestLocationAndMicPermissions();

        let nextPage: "Home" | "Permission" | "Language";
        if (savedLanguage && isPermissionSetting) {
          nextPage = "Home";
        } else if (savedLanguage && !isPermissionSetting) {
          nextPage = "Permission";
        } else {
          nextPage = "Language";
        }
        return {nextPage, accessToken};
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

  async reSendData() {
    try {
      const response = await axios.get(`http://${backendUrl}:3000/resend`);
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

  async getAuthPhoneCode() {
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
}
