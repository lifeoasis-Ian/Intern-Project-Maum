import React from "react";
import {Alert, Image, Linking, Platform, Text, View} from "react-native";
import colors from "../../styles/color.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {Screens, RootStackParamList} from "../../navigation/navigationTypes.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import {
  requestNotifications,
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  check,
  RESULTS,
  request,
} from "react-native-permissions";

type PermissionScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.Permission
>;

interface PermissionScreenProps {
  navigation: PermissionScreenNavigationProps;
}

const Permission: React.FC<PermissionScreenProps> = ({navigation}) => {
  const platform = Platform.OS === "ios" ? "ios" : "android";

  function handleSetPermissions() {
    if (platform === "ios") {
      checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.MICROPHONE,
      ])
        .then(res => {
          console.log(res);
          if (
            res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED ||
            res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED ||
            res[PERMISSIONS.IOS.MICROPHONE] === RESULTS.BLOCKED ||
            res[PERMISSIONS.IOS.MICROPHONE] === RESULTS.DENIED
          ) {
            Alert.alert(
              "이 앱은 위치 권한과 마이크 허용이 필수입니다.",
              "설정에서 위치와 마이크 권한을 허용으로 바꿔주세요.",
              [
                {
                  text: "허용",
                  onPress: async () => {
                    await requestMultiple([
                      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                      PERMISSIONS.IOS.MICROPHONE,
                    ]).then(status => {
                      if (
                        status["ios.permission.LOCATION_WHEN_IN_USE"] ===
                          "granted" &&
                        status["ios.permission.MICROPHONE"] === "granted"
                      ) {
                        navigation.push(Screens.Home);
                      } else if (
                        status["ios.permission.MICROPHONE"] === "blocked" ||
                        status["ios.permission.LOCATION_WHEN_IN_USE"] ===
                          "denied" ||
                        status["ios.permission.MICROPHONE"] === "denied" ||
                        status["ios.permission.LOCATION_WHEN_IN_USE"] ===
                          "blocked"
                      ) {
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
                      }
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
          } else if (
            res["ios.permission.MICROPHONE"] === "granted" &&
            res["ios.permission.LOCATION_WHEN_IN_USE"] === "granted"
          ) {
            navigation.push(Screens.Home);
          }
        })
        .catch(console.error);
    } else {
      checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ])
        .then(res => {
          if (
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED ||
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.BLOCKED ||
            res[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.BLOCKED ||
            res[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.DENIED
          ) {
            Alert.alert(
              "이 앱은 위치 권한과 마이크 허용이 필수입니다.",
              "설정에서 위치와 마이크 권한을 허용으로 바꿔주세요.",
              [
                {
                  text: "허용",
                  onPress: async () => {
                    await requestMultiple([
                      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                      PERMISSIONS.ANDROID.RECORD_AUDIO,
                    ]).then(status => {
                      if (
                        status["android.permission.ACCESS_FINE_LOCATION"] ===
                          "granted" &&
                        status["android.permission.RECORD_AUDIO"] === "granted"
                      ) {
                        navigation.push(Screens.Home);
                      } else if (
                        status["android.permission.ACCESS_FINE_LOCATION"] ===
                          "blocked" ||
                        status["android.permission.RECORD_AUDIO"] ===
                          "denied" ||
                        status["android.permission.ACCESS_FINE_LOCATION"] ===
                          "denied" ||
                        status["android.permission.RECORD_AUDIO"] === "blocked"
                      ) {
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
                      }
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
          } else if (
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED ||
            res[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED
          ) {
            navigation.push(Screens.Home);
          }
        })
        .catch(console.error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <Text
        style={{
          color: colors.fontBlack,
          textAlign: "center",
          fontSize: 28,
          fontWeight: "700",
          marginTop: 20,
          lineHeight: 42,
        }}>
        {"마지막! 꼭 필요한\n권한을 허용해 주세요 😉"}
      </Text>
      <View style={{flex: 1, marginTop: 52, flexDirection: "column", gap: 32}}>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/bnr.png")}
            style={{height: 60, width: 60, marginLeft: 30}}
          />
          <View style={{marginLeft: 24, marginTop: 5}}>
            <Text style={{fontSize: 16, lineHeight: 25.6, fontWeight: "700"}}>
              마이크 (필수)
            </Text>
            <Text
              style={{fontSize: 14, color: colors.fontGray, lineHeight: 22.4}}>
              친구와 통화 연결
            </Text>
          </View>
        </View>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/bnr2.png")}
            style={{height: 60, width: 60, marginLeft: 30}}
          />
          <View style={{marginLeft: 24, marginTop: 5}}>
            <Text style={{fontSize: 16, lineHeight: 25.6, fontWeight: "700"}}>
              위치 정보 (필수)
            </Text>
            <Text
              style={{fontSize: 14, color: colors.fontGray, lineHeight: 22.4}}>
              원하는 나라의 친구 매칭
            </Text>
          </View>
        </View>
      </View>
      <RoundedButton
        content="확인"
        onPress={handleSetPermissions}
        buttonStyle={{
          marginHorizontal: 30,
          marginBottom: 30,
          backgroundColor: colors.main,
          paddingHorizontal: 36,
          paddingTop: 22,
          paddingBottom: 18,
          borderRadius: 30,
        }}
        textStyle={{
          fontSize: 20,
          lineHeight: 20,
          textAlign: "center",
          fontWeight: "700",
          color: colors.fontWhite,
        }}
      />
    </View>
  );
};

export default Permission;
