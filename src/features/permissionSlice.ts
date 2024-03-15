import {createSlice} from "@reduxjs/toolkit";

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
