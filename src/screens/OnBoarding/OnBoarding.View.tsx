import {View, Image, SafeAreaView} from "react-native";
import React from "react";
import colors from "../../styles/color.ts";
import {OnBoardingViewProps} from "./types.ts";
import Typography from "../../components/Typography.tsx";
import {CustomButton} from "../../components/CustomButton.tsx";

const OnBoardingView: React.FC<OnBoardingViewProps> = ({handleMoveNext}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.backgroundColor,
        paddingBottom: 32,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
        }}>
        <Image
          source={require("../../assets/img_heart.png")}
          style={{height: 70, objectFit: "contain", marginBottom: 16}}
        />
        <Typography
          type={"initial"}
          style={{marginBottom: 12}}
          color={"black"}
          size={20}
          bold={"700"}
          text={"안녕하세요? 반가워요"}
        />
        <Typography
          type={"sub"}
          lineHeight={1.6}
          center={true}
          color={"dark-gray"}
          text={
            "마음은 따뜻한 1:1 소셜 통화 앱이에요.\n지금 대화 친구를 만나세요!"
          }
        />
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}>
        <CustomButton
          contents={"시작하기"}
          style={{
            marginBottom: 16,
            paddingHorizontal: 136,
            paddingVertical: 18,
          }}
          onPress={handleMoveNext}
          rounded={"normal"}
          size={18}
          bold={"700"}
        />
        <Typography
          type={"initial"}
          size={12}
          lineHeight={1}
          bold={"500"}
          center={true}
          color={"dark-gray"}
          text={"가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다."}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingView;
