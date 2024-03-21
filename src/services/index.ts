import {AuthService} from "./AuthService.ts";
import {GetUserDataService} from "./GetUserDataService.ts";
import {PermissionService} from "./permissionService.ts";
import {SaveService} from "./SaveService.ts";

export const authService = new AuthService();
export const getUserDataService = new GetUserDataService();
export const permissionService = new PermissionService();
export const saveService = new SaveService();
