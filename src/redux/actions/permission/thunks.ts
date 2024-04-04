import {createAsyncThunk} from "@reduxjs/toolkit";
import {service} from "../../../domains";
import {setPermission} from "./reducer.ts";

export const fetchPermission = createAsyncThunk<void, undefined>(
  "device/permission",
  async (_, {dispatch}) => {
    const nowPermissionSetting =
      await service.permission.checkLocationAndMicrophonePermissions();
    dispatch(setPermission(nowPermissionSetting));
  },
);
