import {AuthService} from "./AuthService.ts";
import {UserService} from "./UserService.ts";
import {PermissionService} from "./PermissionService.ts";
import {SaveService} from "./SaveService.ts";
import {Platform} from "react-native";
export const backendUrl =
  Platform.OS === "ios" ? "localhost" : "10.170.130.174";
export const authService = new AuthService();
export const userService = new UserService();
export const permissionService = new PermissionService();
export const saveService = new SaveService();
