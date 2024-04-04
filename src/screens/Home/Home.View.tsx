import {View, SafeAreaView, Image, Text, TouchableOpacity} from "react-native";
import React, {useEffect, useRef} from "react";
import colors from "../../styles/color.ts";
import {HomeParamsProps} from "./type.ts";
import Typography from "../../components/Typography.tsx";
import {CustomButton} from "../../components/CustomButton.tsx";
import {Modalize} from "react-native-modalize";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";

const HomeView: React.FunctionComponent<HomeParamsProps> = ({
  imageUrl,
  manner,
  nickname,
  handleLogout,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: "center",
        paddingBottom: 30,
      }}>
      <View
        style={{
          marginTop: 46,
          flex: 1,
          flexDirection: "row",
          gap: 12,
          marginHorizontal: 30,
        }}>
        <Image
          source={{uri: `https://${imageUrl}`}}
          style={{width: 64, height: 64, borderRadius: 50}}
        />
        <View>
          <Typography
            text={nickname}
            bold={"600"}
            size={14}
            lineHeight={1.6}
            color={"black"}
          />
          <Typography
            text={"🇰🇷대한민국, 서울시"}
            bold={"400"}
            lineHeight={1.6}
            color={"dark-gray"}
          />
          <Typography
            bold={"400"}
            lineHeight={1.6}
            text={`😍 ${manner}`}
            color={"dark-gray"}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          marginHorizontal: 30,
        }}>
        <CustomButton
          contents={"로그아웃"}
          rounded={"normal"}
          onPress={handleLogout}
          bold={"700"}
          style={{paddingHorizontal: 36, paddingTop: 22, paddingBottom: 18}}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeView;
