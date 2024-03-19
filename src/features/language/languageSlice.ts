import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";

const langInitialState = {
  savedLanguage: "",
};

export const languageSlice = createSlice({
  name: "language",
  initialState: langInitialState,
  reducers: {
    setNowLanguage: (state, action) => {
      state.savedLanguage = action.payload;
    },
  },
});

export const {setNowLanguage} = languageSlice.actions;
export default languageSlice.reducer;
