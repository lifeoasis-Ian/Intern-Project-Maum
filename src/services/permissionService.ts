import {checkMultiple, PERMISSIONS, RESULTS} from "react-native-permissions";
import {AppDispatch} from "../app/store";
import {setPermission} from "../features/permissionSlice";
import {Platform} from "react-native";

export const checkSetPermissions = (
  dispatch: AppDispatch,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const permissions =
      Platform.OS === "ios"
        ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
          ];

    checkMultiple(permissions)
      .then(status => {
        const allPermissionsGranted = Object.values(status).every(
          status => status === RESULTS.GRANTED,
        );
        dispatch(setPermission(allPermissionsGranted));
        resolve(allPermissionsGranted);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
