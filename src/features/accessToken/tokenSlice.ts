import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

const tokenInitialState = {
  accessToken: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: tokenInitialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const {setAccessToken} = tokenSlice.actions;
export default tokenSlice.reducer;
