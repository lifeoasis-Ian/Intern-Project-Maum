import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {CountryPicker} from "react-native-country-codes-picker";
import colors from "../../styles/color.ts";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import RoundedButton from "../../components/RoundedButton.tsx";
import {AuthService} from "../../services/AuthService.ts";
import MainText from "../../components/MainText.tsx";
import {useHeaderHeight} from "@react-navigation/elements";
import Toast from "react-native-toast-message";

type AuthPhoneScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhone"
>;

interface AuthScreenProps {
  navigation: AuthPhoneScreenNavigationProps;
}

const AuthPhone: React.FC<AuthScreenProps> = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+82");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disabled, setDisabled] = useState(true);
  const authService = new AuthService();

  const headerHeight = useHeaderHeight();
  const [isNavMounted, setNavMounted] = useState(false);

  const showAuthCodeTryOverErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "인증 번호 요청 제한",
      text2: "1분 뒤에 다시 시도해주세요!",
    });
  };

  const onlyNum = (phoneNumber: string) => {
    return setPhoneNumber(phoneNumber.replace(/[^0-9]/g, ""));
  };

  const buttonDisabled = () => {
    if (phoneNumber.length >= 11) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const getAuthPhoneCode = async () => {
    try {
      const result = await authService.sendPhoneNumber();
      if (result === 429) {
        showAuthCodeTryOverErrorToast();
      } else {
        navigation.push("AuthPhoneCode", {phoneNumber, countryCode});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return navigation.addListener("transitionEnd", () => {
      setNavMounted(true);
    });
  }, [navigation]);

  useEffect(() => {
    buttonDisabled();
  }, [phoneNumber, countryCode]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 12,
        }}>
        <Image
          source={require("../../assets/auth_icon.png")}
          style={{height: 40, objectFit: "contain", marginVertical: 8}}
        />
        <MainText>전화번호 가입</MainText>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            lineHeight: 28.8,
            fontWeight: "500",
            color: colors.fontGray,
          }}>
          {"안심하세요! 번호는 암호화되며,\n절대 공개되지 않아요."}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 30,
          marginTop: 32,
        }}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderBottomColor: colors.main,
            paddingBottom: Platform.OS === "ios" ? 10 : 0,
            paddingRight: 10,
          }}>
          <Text
            style={{
              color: colors.fontBlack,
              fontSize: 18,
              lineHeight: 18,
              fontWeight: "500",
            }}>
            {countryCode}
          </Text>
          <Image
            source={require("../../assets/arr.png")}
            style={{
              objectFit: "contain",
              height: 12,
              width: 11,
              marginLeft: 4,
            }}
          />
          <CountryPicker
            show={show}
            pickerButtonOnPress={item => {
              setCountryCode(item.dial_code);
              setShow(false);
            }}
            lang={"en"}
            style={{
              modal: {
                height: 500,
                backgroundColor: colors.backgroundColor,
              },
              dialCode: {
                color: colors.fontBlack,
              },
              countryName: {
                color: colors.fontBlack,
              },
            }}
            onBackdropPress={() => setShow(false)}
          />
        </TouchableOpacity>
        <TextInput
          autoFocus={true}
          placeholder={"전화번호"}
          style={{
            flex: 1,
            fontSize: 24,
            lineHeight: 28.8,
            fontWeight: "400",
            paddingBottom: 10,
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderBottomColor: colors.main,
            color: colors.fontBlack,
          }}
          keyboardType={"numeric"}
          value={phoneNumber}
          onChangeText={onlyNum}
        />
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginHorizontal: 30,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight + 6}>
        <RoundedButton
          disabled={disabled}
          content="인증번호 받기"
          onPress={getAuthPhoneCode}
          buttonStyle={{
            borderRadius: 30,
            backgroundColor: colors.main,
            opacity: disabled ? 0.6 : 1,
            paddingHorizontal: 36,
            paddingBottom: 18,
            paddingTop: 22,
            marginBottom: Platform.OS === "android" ? 10 : 0,
          }}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 20,
            lineHeight: 20,
            fontWeight: "700",
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthPhone;
