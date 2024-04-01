import {asyncDispatch} from "../types.ts";
import {fetchCountryCode, fetchPhone} from "./thunks.ts";
export const savePhone = async (phoneNumber: string) =>
  await asyncDispatch<void, string>(fetchPhone, phoneNumber);
export const saveCountryCode = async (countryCode: string) =>
  await asyncDispatch<void, string>(fetchCountryCode, countryCode);
