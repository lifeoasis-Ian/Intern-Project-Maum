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
    removeNowLanguage: state => {
      state.savedLanguage = "";
    },
  },
});

export const {setNowLanguage, removeNowLanguage} = languageSlice.actions;
export default languageSlice.reducer;
