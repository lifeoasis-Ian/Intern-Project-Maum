import {asyncDispatch} from "../types.ts";
import {
  fetchAvatar,
  fetchAvatarSaving,
  fetchCountryCode,
  fetchPhone,
} from "./thunks.ts";
export const savePhone = async (phoneNumber: string) =>
  await asyncDispatch<void, string>(fetchPhone, phoneNumber);
export const saveCountryCode = async (countryCode: string) =>
  await asyncDispatch<void, string>(fetchCountryCode, countryCode);
export const getAvatar = async (token: string) =>
  await asyncDispatch<string, string>(fetchAvatar, token);

export const saveAvatar = async (token: string) =>
  await asyncDispatch<void, string>(fetchAvatarSaving, token);
