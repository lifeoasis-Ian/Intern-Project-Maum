import axios from "axios";
import {backendUrl} from "../index.ts";

export class UserService {
  async getNickname(token: string) {
    const resultNickname = await axios.get(
      `http://${backendUrl}:3000/getNickname`,
      {
        params: {
          token,
        },
      },
    );
    return resultNickname.data;
  }
  async getMannerScore(token: string) {
    const resultManner = await axios.get(
      `http://${backendUrl}:3000/getMannerScore`,
      {
        params: {
          token,
        },
      },
    );
    return resultManner.data;
  }
  async getAvatar(token: string) {
    const resultAvatar = await axios.get(
      `http://${backendUrl}:3000/getAvatar`,
      {
        params: {
          token,
        },
      },
    );
    return resultAvatar.data;
  }
  async getLanguage(token: string) {
    const resultUserByToken = await axios.get(
      `http://${backendUrl}:3000/getLanguage`,
      {params: {token: token}},
    );

    return resultUserByToken.data;
  }

  async saveLanguage(language: string, accessToken: string) {
    try {
      return await axios.post(`http://${backendUrl}:3000/saveLanguage`, {
        language: language,
        token: accessToken,
      });
    } catch (error) {
      throw error;
    }
  }
}
