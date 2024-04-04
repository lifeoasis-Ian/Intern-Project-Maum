import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import colors from "../../styles/color.ts";
import React from "react";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Spinner from "react-native-loading-spinner-overlay";
import {AuthCodeParamsProps, AuthCodeScreenProps} from "./types.ts";
import Typography from "../../components/Typography.tsx";
import {CustomButton} from "../../components/CustomButton.tsx";

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
      <Typography
        text={"인증번호 입력"}
        lineHeight={1.5}
        type={"main"}
        center={true}
      />
      <Typography
        center={true}
        type={"sub"}
        color={"dark-gray"}
        text={`${countryCode} ${phoneNumber}`}
      />
      {secondsLeft <= 0 ? (
        <TouchableOpacity onPress={handleReSendCode}>
          <Typography
            type={"initial"}
            text={"인증 문자 다시 받기"}
            color={"blue"}
            size={14}
            center={true}
            style={{marginTop: 16}}
            bold={"500"}
          />
        </TouchableOpacity>
      ) : (
        <Typography
          type={"initial"}
          style={{marginTop: 16}}
          color={"main"}
          bold={"500"}
          size={14}
          center={true}
          text={`${calculateTime().displayMins}:${calculateTime().displaySecs}`}
        />
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
          <CustomButton
            contents={"인증 문자가 오지 않나요?"}
            backgroundColor={"backgroundGray"}
            rounded={"x-small"}
            onPress={showReSendCodeAlert}
            size={12}
            lineHeight={1.6}
            color={"dark-gray"}
            style={{
              paddingTop: 6,
              paddingBottom: 5,
              paddingHorizontal: 10,
              marginBottom: 30,
            }}
            bold={"700"}
          />
          <CustomButton
            contents={"확인"}
            rounded={"normal"}
            bold={"700"}
            style={{paddingTop: 22, paddingBottom: 18, paddingHorizontal: 36}}
            onPress={handleCheckAuthCode}
            disabled={disabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthCodeView;
