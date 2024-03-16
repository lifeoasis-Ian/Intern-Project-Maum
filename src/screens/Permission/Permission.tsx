import React from "react";
import {Alert, Image, Linking, Platform, Text, View} from "react-native";
import colors from "../../styles/color.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {Screens, RootStackParamList} from "../../navigation/navigationTypes.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import {PermissionService} from "../../services/permissionService.ts";

type PermissionScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.Permission
>;

interface PermissionScreenProps {
  navigation: PermissionScreenNavigationProps;
}

const Permission: React.FC<PermissionScreenProps> = ({navigation}) => {
  const permissionService = new PermissionService();
  async function handleSetPermissions() {
    if (await permissionService.checkPermissionAndReturnIsSetPermission()) {
      navigation.push(Screens.Home);
    } else {
      permissionService.returnPermissionAlert();
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
