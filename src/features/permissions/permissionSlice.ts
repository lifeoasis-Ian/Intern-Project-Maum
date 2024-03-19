import {createSlice} from "@reduxjs/toolkit";
import {Platform} from "react-native";
import {checkMultiple, PERMISSIONS, RESULTS} from "react-native-permissions";
import {useAppDispatch} from "../../app/hooks.ts";

export const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    isSetPermission: false,
  },
  reducers: {
    setPermission: (state, action) => {
      state.isSetPermission = action.payload;
    },
  },
});

export const {setPermission} = permissionSlice.actions;

export default permissionSlice.reducer;
