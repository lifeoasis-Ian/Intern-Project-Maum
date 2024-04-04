import React from "react";
import {Image, SafeAreaView, Text, View} from "react-native";
import colors from "../../styles/color.ts";
import Typography from "../../components/Typography.tsx";
import {PermissionParamsProps} from "./types.ts";
import {CustomButton} from "../../components/CustomButton.tsx";

const PermissionView: React.FC<PermissionParamsProps> = ({
  handleSetPermissions,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingBottom: 30,
      }}>
      <Typography
        text={"마지막! 꼭 필요한\n권한을 허용해 주세요 😉"}
        type={"main"}
        center={true}
        lineHeight={1.5}
        color={"black"}
      />
      <View style={{flex: 1, marginTop: 52, flexDirection: "column", gap: 32}}>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/bnr.png")}
            style={{height: 60, width: 60, marginLeft: 30}}
          />
          <View style={{marginLeft: 24, marginTop: 5}}>
            <Typography
              text={"마이크 (필수)"}
              type={"initial"}
              size={16}
              lineHeight={1.6}
              color={"black"}
              bold={"700"}
            />
            <Typography
              text={"친구와 통화 연결"}
              type={"initial"}
              size={14}
              lineHeight={1.6}
              color={"dark-gray"}
              bold={"500"}
            />
          </View>
        </View>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/bnr2.png")}
            style={{height: 60, width: 60, marginLeft: 30}}
          />
          <View style={{marginLeft: 24, marginTop: 5}}>
            <Typography
              text={"위치 정보 (필수)"}
              type={"initial"}
              size={16}
              lineHeight={1.6}
              color={"black"}
              bold={"700"}
            />
            <Typography
              text={"원하는 나라의 친구 매칭"}
              type={"initial"}
              size={14}
              lineHeight={1.6}
              color={"dark-gray"}
              bold={"500"}
            />
          </View>
        </View>
      </View>
      <CustomButton
        contents={"확인"}
        rounded={"normal"}
        bold={"700"}
        style={{
          paddingTop: 22,
          paddingBottom: 18,
          paddingHorizontal: 36,
          marginHorizontal: 30,
        }}
        onPress={handleSetPermissions}
      />
    </SafeAreaView>
  );
};

export default PermissionView;
