import {View, Text, TouchableOpacity, Image} from "react-native";
import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import {GetUserDataService} from "../../services/GetUserDataService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OnboardingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "OnBoarding"
>;

interface MainScreenProps {
  navigation: OnboardingScreenNavigationProps;
}

const OnboardingPageLayout = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundColor,
        marginTop: 100,
      }}>
      <Image
        source={require("../../assets/img_heart.png")}
        style={{height: 70, objectFit: "contain"}}
      />
      <Text
        style={{
          color: colors.fontBlack,
          fontSize: 20,
          fontWeight: "600",
          marginTop: 15,
        }}>
        안녕하세요? 반가워요
      </Text>
      <Text
        style={{
          marginTop: 15,
          fontSize: 18,
          fontWeight: "300",
          color: colors.fontGray,
          textAlign: "center",
          lineHeight: 28.8,
        }}>
        {"마음은 따뜻한 1:1 소셜 통화 앱이에요.\n지금 대화 친구를 만나세요!"}
      </Text>
    </View>
  );
};

const BottomText = () => {
  return (
    <View style={{marginBottom: 40}}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          color: colors.fontGray,
        }}>
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
        <RoundedButton
          buttonStyle={{
            backgroundColor: colors.main,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            borderRadius: 30,
          }}
          content="시작하기"
          onPress={async () => {
            navigation.push("AuthPhone");
          }}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        />
      </View>
      <BottomText />
    </View>
  );
};

export default OnBoarding;
