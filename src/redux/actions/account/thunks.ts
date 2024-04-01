import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkSignIn, saveToken, setLogout, setPermission} from "./reducer.ts";
import {service} from "../../../domains";

export const fetchToken = createAsyncThunk<string, undefined>(
  "account/token",
  async (_, {dispatch}) => {
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

export const fetchPermission = createAsyncThunk<void, undefined>(
  "account/permission",
  async (_, {dispatch}) => {
    const resultPermission =
      await service.permission.checkLocationAndMicrophonePermissions();
    if (resultPermission) {
      dispatch(setPermission(true));
    } else {
      dispatch(setPermission(false));
    }
  },
);

export const fetchLogout = createAsyncThunk<void, undefined>(
  "account/logout",
  async (_, {dispatch}) => {
    dispatch(setLogout());
  },
);
