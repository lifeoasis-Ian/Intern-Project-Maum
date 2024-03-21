import {View, Text, Image, BackHandler, SafeAreaView} from "react-native";
import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import {useFocusEffect, useRoute} from "@react-navigation/native";

type OnboardingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "OnBoarding"
>;

interface MainScreenProps {
  navigation: OnboardingScreenNavigationProps;
}

const OnBoarding: React.FunctionComponent<MainScreenProps> = props => {
  const {navigation} = props;
  const routesParams = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true,
      );
      return () => {
        subscription.remove();
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.backgroundColor,
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
          }}>
          안녕하세요? 반가워요
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: colors.fontGray,
            textAlign: "center",
            lineHeight: 28.8,
          }}>
          {"마음은 따뜻한 1:1 소셜 통화 앱이에요.\n지금 대화 친구를 만나세요!"}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
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
          onPress={() => {
            navigation.push("AuthPhone");
          }}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        />

        <View style={{marginBottom: 32}}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: colors.fontGray,
            }}>
            가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
