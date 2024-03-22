import {AuthService} from "./AuthService.ts";
import {GetUserDataService} from "./GetUserDataService.ts";
import {PermissionService} from "./PermissionService.ts";
import {SaveService} from "./SaveService.ts";
import {Platform} from "react-native";
export const backendUrl =
  Platform.OS === "ios" ? "localhost" : "10.170.130.166";
export const authService = new AuthService();
export const getUserDataService = new GetUserDataService();
export const permissionService = new PermissionService();
export const saveService = new SaveService();
