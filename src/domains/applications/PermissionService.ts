import {Alert, Linking, Platform} from "react-native";
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import actions from "../../redux/actions";

export class PermissionService {
  async getLocationAndMicrophonePermissionsArray() {
    return Platform.OS === "ios"
      ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.MICROPHONE]
      : [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ];
  }
  async checkLocationAndMicrophonePermissions(): Promise<boolean> {
    const permissionsArray =
      await this.getLocationAndMicrophonePermissionsArray();

    const resultChecking = await checkMultiple(permissionsArray);

    return Object.values(resultChecking).every(
      status => status === RESULTS.GRANTED,
    );
  }

  async showLocationAndMicPermissionAlert() {
    const permissionsArray =
      await this.getLocationAndMicrophonePermissionsArray();
    Alert.alert(
      "이 앱은 위치 권한과 마이크 허용이 필수입니다.",
      "설정에서 위치와 마이크 권한을 허용으로 바꿔주세요.",
      [
        {
          text: "허용",
          onPress: async () => {
            const result = await requestMultiple(permissionsArray);
            if (
              Object.values(result).every(status => status === RESULTS.GRANTED)
            ) {
              await actions.permission.updatePermissionStatus();
            } else {
              await requestMultiple(permissionsArray);
              await Linking.openSettings();
            }
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
