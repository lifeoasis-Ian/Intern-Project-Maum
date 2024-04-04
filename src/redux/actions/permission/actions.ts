import {asyncDispatch} from "../types.ts";
import {fetchPermission} from "./thunks.ts";

export const updatePermissionStatus = async () => {
  await asyncDispatch<void, undefined>(fetchPermission);
};
