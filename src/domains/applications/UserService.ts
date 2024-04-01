import axios from "axios";
import {backendUrl} from "../index.ts";

export class UserService {
  async getUserInfo(token: string) {
    const resultUserInfo = await axios.post(
      `http://${backendUrl}:3000/userInfo`,
      {token},
    );
    return resultUserInfo.data.user;
  }
}
