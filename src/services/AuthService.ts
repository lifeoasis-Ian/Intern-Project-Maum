import axios from "axios";
import {
  backendUrl,
  getUserDataService,
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
        await saveService.saveToken(resultChecking.data.token);
        const resultGetLanguage = await getUserDataService.getUserLanguage(
          resultChecking.data.token,
        );
        const savedLanguage = resultGetLanguage.data.language;
        const isPermissionSetting =
          await permissionService.checkAndRequestLocationAndMicPermissions();
        if (savedLanguage && isPermissionSetting) {
          return "Home";
        } else if (savedLanguage && !isPermissionSetting) {
          return "Permission";
        } else {
          return "Language";
        }
      }
    } catch (error: any) {
      if (
        error.response.status === StatusCode.NOT_MATCH_AUTHCODE_ERROR_CODE_NUM
      ) {
        throw new Error(StatusCode.NOT_MATCH_AUTHCODE_ERROR_CODE);
      } else if (error.response.status === StatusCode.TRY_OVER_ERROR_CODE_NUM) {
        throw new Error(StatusCode.TRY_OVER_ERROR_CODE);
      } else {
        throw new Error("Server Error!");
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
