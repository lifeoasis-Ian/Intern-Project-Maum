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
import React, {useMemo, useState} from "react";
import {CountryPicker} from "react-native-country-codes-picker";
import colors from "../../styles/color.ts";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import RoundedButton from "../../components/RoundedButton.tsx";
import {CustomMainText, CustomSubText} from "../../components/Texts.tsx";
import {useHeaderHeight} from "@react-navigation/elements";
import {showAuthCodeTryOverErrorToast} from "../../components/ToastMessages.tsx";
import {authService} from "../../services";
import {StatusCode} from "../../utils/StatusCode.ts";
import {blockStringInput} from "../../utils/blockStringInput.ts";
import {useThrottle} from "../../hooks/useThrottle.ts";

type AuthPhoneScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhone"
>;

interface AuthScreenProps {
  navigation: AuthPhoneScreenNavigationProps;
}

const PHONE_NUMBER_LENGTH = 11;

const AuthPhone: React.FC<AuthScreenProps> = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+82");
  const [phoneNumber, setPhoneNumber] = useState("");

  const throttle = useThrottle();

  const disabled = useMemo(
    () => phoneNumber.length < PHONE_NUMBER_LENGTH,
    [phoneNumber],
  );
  const headerHeight = useHeaderHeight();

  async function handleGetAuthCode() {
    console.log("!");
    try {
      await authService.getAuthPhoneCode();
      navigation.push("AuthPhoneCode", {phoneNumber, countryCode});
    } catch (error: any) {
      if (error.message === StatusCode.TRY_OVER_ERROR_CODE) {
        showAuthCodeTryOverErrorToast();
      } else {
        throw error;
      }
    }
  }

  const handleGetAuthCodeWithThrottle = throttle(handleGetAuthCode, 2000);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingBottom: 30,
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
        <CustomMainText>전화번호 가입</CustomMainText>
        <CustomSubText>
          {"안심하세요! 번호는 암호화되며,\n절대 공개되지 않아요."}
        </CustomSubText>
      </View>
      <View
        style={{
          marginHorizontal: 30,
          marginTop: 32,
        }}>
        <View
          style={{
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderBottomColor: colors.main,
            flexDirection: "row",
            gap: 12,
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text
              style={{
                color: colors.fontBlack,
                fontSize: 18,
                fontWeight: "500",
              }}>
              {countryCode}
            </Text>
            <Image
              source={require("../../assets/arr.png")}
              style={{
                objectFit: "contain",
                height: 12,
                width: 12,
                marginLeft: 4,
              }}
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
              color: colors.fontBlack,
              padding: 0, // textInput android vertical spacing https://github.com/facebook/react-native/issues/6096
              margin: 0,
            }}
            keyboardType={"numeric"}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(blockStringInput(text))}
          />
        </View>
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
          onPress={handleGetAuthCodeWithThrottle}
          buttonStyle={{
            borderRadius: 30,
            backgroundColor: colors.main,
            paddingHorizontal: 36,
            paddingBottom: 18,
            paddingTop: 22,
          }}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 20,
            lineHeight: 20,
            fontWeight: "700",
          }}
        />
      </KeyboardAvoidingView>
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
    </SafeAreaView>
  );
};

export default AuthPhone;
