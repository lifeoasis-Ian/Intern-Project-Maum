import {configureStore} from "@reduxjs/toolkit";
import {permissionSlice} from "../features/permissions/permissionSlice.ts";
import {languageSlice} from "../features/language/languageSlice.ts";
import {tokenSlice} from "../features/accessToken/tokenSlice.ts";

export const store = configureStore({
  reducer: {
    permission: permissionSlice.reducer,
    language: languageSlice.reducer,
    token: tokenSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
