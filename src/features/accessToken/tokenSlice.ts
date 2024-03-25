import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

interface StateType {
  accessToken: string;
}

const tokenInitialState: StateType = {
  accessToken: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: tokenInitialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: state => {
      state.accessToken = "";
    },
  },
});

export const {setAccessToken, removeAccessToken} = tokenSlice.actions;
export default tokenSlice.reducer;
