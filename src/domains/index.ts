import {AuthenticationService} from "./applications/AuthenticationService.ts";
import {Platform} from "react-native";
import {UserService} from "./applications/UserService.ts";
import {PermissionService} from "./applications/PermissionService.ts";

export const backendUrl =
  Platform.OS === "ios" ? "localhost" : "10.170.130.215";

export const service = {
  authentication: new AuthenticationService(),
  permission: new PermissionService(),
  user: new UserService(),
};
