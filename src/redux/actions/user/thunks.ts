import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAvatar, setCountryCode, setPhoneNumber} from "./reducer.ts";
import {service} from "../../../domains";
import {set} from "lodash";

export const fetchPhone = createAsyncThunk<void, string>(
  "user/phone",
  async (phoneNumber: string, {dispatch}) => {
    dispatch(setPhoneNumber(phoneNumber));
  },
);

export const fetchCountryCode = createAsyncThunk<void, string>(
  "user/countryCode",
  async (countryCode: string, {dispatch}) => {
    dispatch(setCountryCode(countryCode));
  },
);

export const fetchAvatar = createAsyncThunk<string, string>(
  "user/avatar",
  async (token: string) => {
    return await service.user.getAvatar(token);
  },
);

export const fetchAvatarSaving = createAsyncThunk<void, string>(
  "user/save/avatar",
  async (token: string, {dispatch}) => {
    const result = await service.user.getAvatar(token);
    dispatch(setAvatar(result));
  },
);
