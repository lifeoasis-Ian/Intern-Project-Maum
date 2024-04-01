import {View, Text, Image, SafeAreaView} from "react-native";
import React, {useEffect} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import useBlockBackHandler from "../../hooks/useBlockBackHandler.ts";
import {CustomSubText} from "../../components/Texts.tsx";
import {useThrottle} from "../../hooks/useThrottle.ts";

type OnboardingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "OnBoarding"
>;

interface MainScreenProps {
  navigation: OnboardingScreenNavigationProps;
}

const OnBoarding: React.FunctionComponent<MainScreenProps> = props => {
  const {navigation} = props;

  const handleClickNextPageWithThrottle = useThrottle(
    () => navigation.push("AuthPhone"),
    2000,
  );

  useBlockBackHandler();

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
        <Text
          style={{
            color: colors.fontBlack,
            fontSize: 20,
            fontWeight: "700",
            lineHeight: 20,
            marginBottom: 12,
          }}>
          안녕하세요? 반가워요
        </Text>
        <CustomSubText>
          {"마음은 따뜻한 1:1 소셜 통화 앱이에요.\n지금 대화 친구를 만나세요!"}
        </CustomSubText>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}>
        <RoundedButton
          buttonStyle={{
            backgroundColor: colors.main,
            paddingHorizontal: 36,
            paddingVertical: 18,
            borderRadius: 30,
            marginBottom: 16,
          }}
          content="시작하기"
          onPress={handleClickNextPageWithThrottle}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: colors.fontGray,
          }}>
          가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
