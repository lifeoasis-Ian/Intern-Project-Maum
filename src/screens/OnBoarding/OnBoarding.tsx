import {View, Text, TouchableOpacity, Image} from "react-native";
import React from "react";
import {OnBoardingStyle} from "./OnBoardingStyle.ts";
import {ButtonStyle} from "../../screens/OnBoarding/ButtonStyle.ts";

// import imgHeart from "../../assets/img_heart.png";
import {StackNavigationProp} from "@react-navigation/stack";
import {Screens, RootStackParamList} from "../../../App.tsx";

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
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <OnboardingPageLayout />
      <View style={ButtonStyle.buttonLayout}>
        <TouchableOpacity
          style={ButtonStyle.buttonContainer}
          onPress={() => navigation.navigate(Screens.AuthPhone)}>
          <Text style={ButtonStyle.buttonText}>시작하기!</Text>
        </TouchableOpacity>
      </View>
      <BottomText />
    </View>
  );
};

export default OnBoarding;
