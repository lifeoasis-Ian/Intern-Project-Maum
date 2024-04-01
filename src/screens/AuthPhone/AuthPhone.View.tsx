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
import React from "react";
import {CountryPicker} from "react-native-country-codes-picker";
import {AuthPhoneProps, AuthScreenProps} from "./types.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import {CustomMainText, CustomSubText} from "../../components/Texts.tsx";
import Spinner from "react-native-loading-spinner-overlay";

const AuthPhoneView: React.FC<AuthPhoneProps> = ({
  handleGetAuthCode,
  onChangePhoneNumber,
  disabled,
  headerHeight,
  show,
  setShow,
  loading,
  countryCode,
  setCountryCode,
  phoneNumber,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingBottom: 30,
      }}>
      <Spinner visible={loading} />
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
            onChangeText={onChangePhoneNumber}
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
          onPress={handleGetAuthCode}
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

export default AuthPhoneView;
