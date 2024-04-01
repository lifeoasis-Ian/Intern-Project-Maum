import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkSignIn, saveToken, setLogout, setPermission} from "./reducer.ts";
import {service} from "../../../domains";

export const fetchToken = createAsyncThunk<string, undefined>(
  "account/token",
  async (_, {dispatch}) => {
    const token = await service.authentication.getSavedToken();
    if (token) {
      dispatch(saveToken(token));
      return token;
    }

    return "";
  },
);

export const fetchTokenSaving = createAsyncThunk(
  "account/tokenSaving",
  async (token: string, {dispatch}) => {
    dispatch(saveToken(token));
  },
);

export const fetchRegisteredUser = createAsyncThunk(
  "account/registeredUser",
  async (token: string, {dispatch}) => {
    if (token) {
      if (await service.authentication.searchUserByToken(token)) {
        dispatch(checkSignIn(true));
      } else {
        dispatch(checkSignIn(false));
      }
    } else {
      dispatch(checkSignIn(false));
    }
  },
);

export const fetchPermission = createAsyncThunk(
  "account/permission",
  async (_, {dispatch}) => {
    const resultPermission =
      await service.permission.checkLocationAndMicrophonePermissions();
    console.log("permission: ", resultPermission);
    if (resultPermission) {
      dispatch(setPermission(true));
    } else {
      dispatch(setPermission(false));
    }
  },
);

export const fetchLogout = createAsyncThunk(
  "account/logout",
  async (_, {dispatch}) => {
    dispatch(setLogout());
  },
);
