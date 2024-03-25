import React from "react";
import {Image, Text, View} from "react-native";
import colors from "../../styles/color.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import {CustomMainText} from "../../components/Texts.tsx";
import {permissionService} from "../../services";
import {useThrottle} from "../../hooks/useThrottle.ts";

type PermissionScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Permission"
>;

interface PermissionScreenProps {
  navigation: PermissionScreenNavigationProps;
}

const Permission: React.FC<PermissionScreenProps> = ({navigation}) => {
  const throttle = useThrottle();
  async function handleSetPermissions() {
    const resultPermissions =
      await permissionService.checkAndRequestLocationAndMicPermissions();
    if (resultPermissions) {
      navigation.push("Home");
    } else {
      await permissionService.showLocationAndMicPermissionAlert();
    }
  }

  const handleSetPermissionsWithThrottle = throttle(handleSetPermissions, 1000);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingTop: 20,
      }}>
      <CustomMainText>
        {"마지막! 꼭 필요한\n권한을 허용해 주세요 😉"}
      </CustomMainText>
      <View style={{flex: 1, marginTop: 52, flexDirection: "column", gap: 32}}>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/bnr.png")}
            style={{height: 60, width: 60, marginLeft: 30}}
          />
          <View style={{marginLeft: 24, marginTop: 5}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 25.6,
                fontWeight: "700",
                color: colors.fontBlack,
              }}>
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
            <Text
              style={{
                fontSize: 16,
                lineHeight: 25.6,
                fontWeight: "700",
                color: colors.fontBlack,
              }}>
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
        onPress={handleSetPermissionsWithThrottle}
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
