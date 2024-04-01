import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import colors from "../../styles/color.ts";
import React, {useEffect, useState} from "react";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import RoundedButton from "../../components/RoundedButton.tsx";
import {CustomMainText, CustomSubText} from "../../components/Texts.tsx";
import Spinner from "react-native-loading-spinner-overlay";
import {AuthCodeParamsProps, AuthCodeScreenProps} from "./types.ts";

const AUTH_CODE_CELL_COUNT = 5;
const AuthCodeView: React.FC<AuthCodeParamsProps> = ({
  calculateTime,
  onChangeAuthCode,
  handleCheckAuthCode,
  showReSendCodeAlert,
  handleReSendCode,
  disabled,
  loading,
  countryCode,
  phoneNumber,
  authCode,
  setAuthCode,
  secondsLeft,
}) => {
  const blurOnFulfillRef = useBlurOnFulfill({
    value: authCode,
    cellCount: AUTH_CODE_CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: authCode,
    setValue: setAuthCode,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <Spinner visible={loading} />
      <CustomMainText>인증번호 입력</CustomMainText>
      <CustomSubText>
        {countryCode} {phoneNumber}
      </CustomSubText>
      {secondsLeft <= 0 ? (
        <TouchableOpacity onPress={handleReSendCode}>
          <Text
            style={{
              color: colors.fontBlue,
              fontWeight: "500",
              fontSize: 14,
              lineHeight: 14,
              textAlign: "center",
              marginTop: 16,
            }}>
            인증 문자 다시 받기
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            color: colors.main,
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 14,
            textAlign: "center",
            marginTop: 16,
          }}>
          {calculateTime().displayMins}:{calculateTime().displaySecs}
        </Text>
      )}
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 30,
        }}>
        <CodeField
          ref={blurOnFulfillRef}
          value={authCode}
          onChangeText={onChangeAuthCode}
          cellCount={AUTH_CODE_CELL_COUNT}
          rootStyle={{
            marginTop: 42,
            height: 55,
          }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoFocus={true}
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                {
                  flex: 1,
                  borderBottomColor: symbol ? colors.main : colors.fontGray,
                  borderBottomWidth: 2,
                  marginHorizontal: 5,
                },
                isFocused && {
                  borderBottomColor: colors.main,
                  borderBottomWidth: 2,
                },
              ]}>
              <Text
                style={{
                  color: colors.fontBlack,
                  fontSize: 36,
                  textAlign: "center",
                }}>
                {symbol}
              </Text>
            </View>
          )}
        />
        <View
          style={{
            width: "100%",
            marginTop: 20,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
          }}>
          <RoundedButton
            content="인증 문자가 오지 않나요?"
            onPress={showReSendCodeAlert}
            buttonStyle={{
              opacity: 0.9,
              justifyContent: "center",
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingTop: 6,
              paddingBottom: 5,
              backgroundColor: "#EAEAEA",
              marginBottom: 30,
            }}
            textStyle={{
              color: colors.fontGray,
              fontWeight: "700",
              fontSize: 12,
              lineHeight: 19.2,
            }}
          />
          <RoundedButton
            disabled={disabled}
            content="확인"
            onPress={handleCheckAuthCode}
            buttonStyle={{
              borderRadius: 60,
              paddingHorizontal: 36,
              paddingTop: 22,
              paddingBottom: 18,
              backgroundColor: colors.main,
            }}
            textStyle={{
              color: colors.fontWhite,
              fontSize: 20,
              fontWeight: "700",
              lineHeight: 20,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthCodeView;
