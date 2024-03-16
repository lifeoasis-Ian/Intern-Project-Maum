import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import {AppDispatch} from "../app/store";
import {setPermission} from "../features/permissionSlice";
import {Alert, Linking, Platform} from "react-native";
import {Screens} from "../navigation/navigationTypes.ts";

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

export class PermissionService {
  async checkPermissionAndReturnIsSetPermission(): Promise<boolean> {
    const permissionsArray =
      Platform.OS === "ios"
        ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
          ];

    try {
      const res = await checkMultiple(permissionsArray);
      const allPermissionsGranted = Object.values(res).every(
        status => status === RESULTS.GRANTED,
      );
      if (!allPermissionsGranted) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async returnPermissionAlert() {
    const permissionsArray =
      Platform.OS === "ios"
        ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
          ];

    await requestMultiple(permissionsArray).then(res => {
      Alert.alert(
        "이 앱은 위치 권한과 마이크 허용이 필수입니다.",
        "설정에서 위치와 마이크 권한을 허용으로 바꿔주세요.",
        [
          {
            text: "허용",
            onPress: async () => {
              await requestMultiple(permissionsArray).then(status => {
                Alert.alert(
                  "권한 변경 필요",
                  "이 앱의 기능을 사용하기 위해서는 위치 권한과 마이크 권한이 필요합니다. 현재 이 권한들이 차단되어 있어서 설정에서 직접 변경해주셔야 합니다.",
                  [
                    {
                      text: "설정으로 이동",
                      onPress: () => Linking.openSettings(),
                    },
                    {
                      text: "취소",
                      onPress: () => console.log("권한 변경 취소"),
                      style: "cancel",
                    },
                  ],
                );
              });
            },
          },
          {
            text: "허용 안 함",
            onPress: () => console.log("취소"),
            style: "cancel",
          },
        ],
      );
    });
  }
}
