import {View, Text, TouchableOpacity, Image} from "react-native";
import React from "react";
import {OnBoardingStyle} from "./OnBoardingStyle.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {Screens, RootStackParamList} from "../../../App.tsx";
import colors from "../../styles/color.ts";
import MyButton from "../../components/MyButton.tsx";

type OnboardingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.OnBoarding
>;

interface MainScreenProps {
  navigation: OnboardingScreenNavigationProps;
}

const OnboardingPageLayout = () => {
  return (
    <View style={OnBoardingStyle.onBoardingLayout}>
      <Image
        source={require("../../assets/img_heart.png")}
        style={{height: 70, objectFit: "contain"}}
      />
      <Text style={OnBoardingStyle.mainText}>안녕하세요? 반가워요</Text>
      <Text style={OnBoardingStyle.subText}>
        {"마음은 따뜻한 1:1 소셜 통화 앱이에요.\n지금 대화 친구를 만나세요!"}
      </Text>
    </View>
  );
};

const BottomText = () => {
  return (
    <View style={OnBoardingStyle.bottomTextLayout}>
      <Text style={OnBoardingStyle.bottomText}>
        가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다.
      </Text>
    </View>
  );
};

const OnBoarding: React.FunctionComponent<MainScreenProps> = props => {
  const {navigation} = props;

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <OnboardingPageLayout />
      <View
        style={{
          marginBottom: 16,
          marginHorizontal: 20,
        }}>
        <MyButton
          buttonStyle={{
            backgroundColor: colors.main,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            borderRadius: 30,
          }}
          content="시작하기"
          onPress={() => {
            navigation.navigate(Screens.AuthPhone);
          }}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 18,
            fontWeight: "700",
            lineHeight: 18,
            textAlign: "center",
          }}
        />
      </View>
      <BottomText />
    </View>
  );
};

export default OnBoarding;
