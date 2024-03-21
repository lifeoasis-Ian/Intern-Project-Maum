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
import MainText from "../../components/MainText.tsx";
import {useHeaderHeight} from "@react-navigation/elements";
import {showAuthCodeTryOverErrorToast} from "../../components/ToastMessages.tsx";
import {authService} from "../../services";

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

  const disabled = useMemo(() => phoneNumber.length < 11, [phoneNumber]);
  const headerHeight = useHeaderHeight();

  const handleGetAuthCode = async () => {
    try {
      await authService.getAuthPhoneCode();
      navigation.push("AuthPhoneCode", {phoneNumber, countryCode});
    } catch (error: any) {
      if (error.message === "429") {
        showAuthCodeTryOverErrorToast();
      } else {
        console.error(error);
      }
    }
  };

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
          onChangeText={text => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
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
          onPress={handleGetAuthCode}
          buttonStyle={{
            borderRadius: 30,
            backgroundColor: colors.main,
            opacity: disabled ? 0.6 : 1,
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
    </SafeAreaView>
  );
};

export default AuthPhone;
