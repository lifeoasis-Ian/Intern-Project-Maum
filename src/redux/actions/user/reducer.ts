import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  language: "",
  phoneNumber: "",
  countryCode: "",
  avatar: "",
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
    setAvatar: (state, actions) => {
      state.avatar = actions.payload;
    },
  },
});

export const {setPhoneNumber, setCountryCode, setAvatar} = user.actions;
export default user.reducer;
