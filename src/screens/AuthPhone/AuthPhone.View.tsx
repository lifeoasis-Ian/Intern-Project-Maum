import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {CountryPicker} from "react-native-country-codes-picker";
import {AuthPhoneProps, AuthScreenProps} from "./types.ts";
import colors from "../../styles/color.ts";
import Spinner from "react-native-loading-spinner-overlay";
import Typography from "../../components/Typography.tsx";
import {CustomButton} from "../../components/CustomButton.tsx";

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
        <Typography
          type={"main"}
          color={"black"}
          lineHeight={1.5}
          text={"전화번호 가입"}
        />
        <Typography
          type={"sub"}
          text={"안심하세요! 번호는 암호화되며,\n절대 공개되지 않아요."}
          color={"dark-gray"}
          lineHeight={1.6}
          center={true}
        />
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
            <Typography
              text={countryCode}
              color={"black"}
              size={18}
              bold={"500"}
            />
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
        <CustomButton
          style={{paddingHorizontal: 36, paddingBottom: 18, paddingTop: 22}}
          disabled={disabled}
          onPress={handleGetAuthCode}
          contents={"인증번호 받기"}
          bold={"700"}
          backgroundColor={"backgroundMain"}
          rounded={"normal"}
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
