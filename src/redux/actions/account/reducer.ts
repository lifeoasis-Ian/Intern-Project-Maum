import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import actions from "../index.ts";

const initialState = {
  token: "",
  isSignIn: false,
  permission: false,
};

const authentication = createSlice({
  name: "account",
  initialState,
  reducers: {
    saveToken: (state, actions: PayloadAction<string>) => {
      state.token = actions.payload;
    },
    checkSignIn: (state, actions: PayloadAction<boolean>) => {
      state.isSignIn = actions.payload;
    },

    setLogout: state => {
      state.token = initialState.token;
      state.isSignIn = initialState.isSignIn;
    },
  },
});

export const {saveToken, checkSignIn, setLogout} = authentication.actions;
export default authentication.reducer;
