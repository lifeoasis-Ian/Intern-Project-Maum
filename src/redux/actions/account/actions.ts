import {asyncDispatch} from "../types.ts";
import {
  fetchLogout,
  fetchRegisteredUser,
  fetchToken,
  fetchTokenSaving,
} from "./thunks.ts";

export const getAccessToken = async () =>
  await asyncDispatch<string, undefined>(fetchToken);
export const saveAccessToken = async (token: string) =>
  await asyncDispatch<void, string>(fetchTokenSaving, token);

export const isSignIn = async (token: string) =>
  await asyncDispatch<void, string>(fetchRegisteredUser, token);

export const resetAll = async () => {
  await asyncDispatch<void, undefined>(fetchLogout);
};
