import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  language: "",
  phoneNumber: "",
  countryCode: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPhoneNumber: (state, actions) => {
      state.phoneNumber = actions.payload;
    },
    setCountryCode: (state, actions) => {
      state.countryCode = actions.payload;
    },
  },
});

export const {setPhoneNumber, setCountryCode} = user.actions;
export default user.reducer;
