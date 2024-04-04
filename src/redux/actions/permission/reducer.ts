import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  permission: false,
};

const permission = createSlice({
  name: "permission",
  initialState: initialState,
  reducers: {
    setPermission: (state, actions: PayloadAction<boolean>) => {
      state.permission = actions.payload;
    },
  },
});

export const {setPermission} = permission.actions;
export default permission.reducer;
