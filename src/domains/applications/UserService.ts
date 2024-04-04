import axios from "axios";
import {backendUrl} from "../index.ts";
import {AxiosResponseWithSaveLanguage, Language, MannerScore} from "./types.ts";

export class UserService {
  async getNickname(token: string): Promise<string> {
    const {data} = await axios.get<{nickname: string}>(
      `http://${backendUrl}:3000/getNickname`,
      {params: {token}},
    );
    return data.nickname;
  }

  async getMannerScore(token: string): Promise<number> {
    const {data} = await axios.get<MannerScore>(
      `http://${backendUrl}:3000/getMannerScore`,
      {params: {token}},
    );

    return data.mannerScore;
  }

  async getAvatar(token: string): Promise<string> {
    const {data} = await axios.get<{avatar: string}>(
      `http://${backendUrl}:3000/getAvatar`,
      {params: {token}},
    );
    return data.avatar;
  }

  async getLanguage(token: string): Promise<string> {
    const {data} = await axios.get<Language>(
      `http://${backendUrl}:3000/getLanguage`,
      {params: {token: token}},
    );

    return data.language;
  }

  async saveLanguage(language: string, accessToken: string) {
    return await axios.post<AxiosResponseWithSaveLanguage>(
      `http://${backendUrl}:3000/saveLanguage`,
      {
        language: language,
        token: accessToken,
      },
    );
  }
}
