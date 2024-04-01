import {Platform} from "react-native";
import {checkMultiple, PERMISSIONS, RESULTS} from "react-native-permissions";

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
}
