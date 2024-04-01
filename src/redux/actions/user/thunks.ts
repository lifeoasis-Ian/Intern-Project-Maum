import {createAsyncThunk} from "@reduxjs/toolkit";
import {setCountryCode, setPhoneNumber} from "./reducer.ts";

export const fetchPhone = createAsyncThunk<void, string>(
  "account/phone",
  async (phoneNumber: string, {dispatch}) => {
    dispatch(setPhoneNumber(phoneNumber));
  },
);

export const fetchCountryCode = createAsyncThunk<void, string>(
  "account/countryCode",
  async (countryCode: string, {dispatch}) => {
    dispatch(setCountryCode(countryCode));
  },
);
