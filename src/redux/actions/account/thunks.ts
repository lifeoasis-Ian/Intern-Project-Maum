import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkSignIn, saveToken, setLogout} from "./reducer.ts";
import {service} from "../../../domains";

export const fetchToken = createAsyncThunk<string, undefined>(
  "account/token",
  async _ => {
    const token = await service.authentication.getSavedToken();

    if (token) {
      return token;
    }
    return "";
  },
);

export const fetchTokenSaving = createAsyncThunk<void, string>(
  "account/tokenSaving",
  async (token: string, {dispatch}) => {
    dispatch(saveToken(token));
  },
);

export const fetchRegisteredUser = createAsyncThunk<void, string>(
  "account/registeredUser",
  async (token: string, {dispatch}) => {
    if (token) {
      if (await service.user.getLanguage(token)) {
        dispatch(checkSignIn(true));
      } else {
        dispatch(checkSignIn(false));
      }
    } else {
      dispatch(checkSignIn(false));
    }
  },
);

export const fetchLogout = createAsyncThunk<void, undefined>(
  "account/logout",
  async (_, {dispatch}) => {
    dispatch(setLogout());
  },
);
