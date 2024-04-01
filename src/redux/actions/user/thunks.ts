import {createAsyncThunk} from "@reduxjs/toolkit";
import {setCountryCode, setPhoneNumber} from "./reducer.ts";

export const fetchPhone = createAsyncThunk(
  "account/phone",
  async (phoneNumber: string, {dispatch}) => {
    if (phoneNumber) {
      dispatch(setPhoneNumber(phoneNumber));
    } else {
      dispatch(setPhoneNumber(""));
    }
  },
);

export const fetchCountryCode = createAsyncThunk(
  "account/countryCode",
  async (countryCode: string, {dispatch}) => {
    if (countryCode) {
      dispatch(setCountryCode(countryCode));
    } else {
      dispatch(setCountryCode(""));
    }
  },
);
