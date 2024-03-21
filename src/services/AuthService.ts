import axios from "axios";
import {Platform} from "react-native";
import {getUserDataService, permissionService, saveService} from "./index.ts";
export let backendUrl = Platform.OS === "ios" ? "localhost" : "10.170.130.166";

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
      if (resultChecking.status === 200) {
        await saveService.saveToken(resultChecking.data.token);
        const resultGetLanguage = await getUserDataService.getUserLanguage(
          resultChecking.data.token,
        );
        const savedLanguage = resultGetLanguage.data.language;
        const isPermissionSetting =
          await permissionService.checkAndRequestPermissions();
        if (savedLanguage && isPermissionSetting) {
          return "Home";
        } else if (savedLanguage && !isPermissionSetting) {
          return "Permission";
        } else {
          return "Language";
        }
      }
    } catch (error: any) {
      if (error.response.status === 405) {
        throw new Error("405");
      } else if (error.response.status === 429) {
        throw new Error("429");
      } else {
        throw new Error("Server Error!");
      }
    }
  }

  async reSendData() {
    try {
      const response = await axios.get(`http://${backendUrl}:3000/resend`);
      if (response.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.response.status === 429) {
        throw new Error("429");
      }
      throw new Error("Server Error!");
    }
  }

  async getAuthPhoneCode() {
    try {
      const response = await axios.post(`http://${backendUrl}:3000/phone`);
      if (response.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.response.status === 429) {
        throw new Error("429");
      }
      throw new Error("Server Error!");
    }
  }
}
