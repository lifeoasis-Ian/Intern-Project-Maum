import {combineReducers, configureStore, Middleware} from "@reduxjs/toolkit";
import accountReducer from "../actions/account/reducer.ts";
import userReducer from "../actions/user/reducer.ts";
import permissionReducer from "../actions/permission/reducer.ts";

const appReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  permission: permissionReducer,
});

const middlewares: Middleware[] = [];

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;