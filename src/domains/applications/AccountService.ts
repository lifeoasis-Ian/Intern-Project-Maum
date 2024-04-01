import axios from "axios";
import {backendUrl} from "../index.ts";
import actions from "../../redux/actions";

export class AccountService {
  async createAccount(
    phoneNumber: string,
    countryCode: string,
    language: string,
    accessToken: string,
  ) {
    try {
      const resultRegister = await axios.post(
        `http://${backendUrl}:3000/registerUser`,
        {
          phoneNumber: phoneNumber,
          countryCode: countryCode,
          language: language,
          token: accessToken,
        },
      );
      return resultRegister.status;
    } catch (error) {
      throw error;
    }
  }
}
