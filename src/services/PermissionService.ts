import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import {Alert, Linking, Platform} from "react-native";

export class PermissionService {
  getLocationAndMicPermissionsArray() {
    return Platform.OS === "ios"
      ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE]
      : [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ];
  }

  async checkAndRequestLocationAndMicPermissions() {
    const permissionsArray = this.getLocationAndMicPermissionsArray();

    const res = await checkMultiple(permissionsArray);
    return Object.values(res).every(status => status === RESULTS.GRANTED);
  }

  async showLocationAndMicPermissionAlert() {
    const permissionsArray = this.getLocationAndMicPermissionsArray();
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
                    onPress: Linking.openSettings,
                  },
                  {text: "취소", style: "cancel"},
                ],
              );
            });
          },
        },
        {
          text: "허용 안 함",
          style: "cancel",
        },
      ],
    );
  }
}
