import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import colors from "../../styles/color.ts";
import React, {useEffect, useState} from "react";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import {CustomMainText, CustomSubText} from "../../components/Texts.tsx";
import BackgroundTimer from "react-native-background-timer";
import {
  showAuthCodeMatchErrorToast,
  showAuthCodeTimeOverErrorToast,
  showAuthCodeTryOverErrorToast,
} from "../../components/ToastMessages.tsx";
import {authService} from "../../services";
import {StatusCode} from "../../utils/StatusCode.ts";
import {blockStringInput} from "../../utils/blockStringInput.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {setAccessToken} from "../../features/accessToken/tokenSlice.ts";
import {useThrottle} from "../../hooks/useThrottle.ts";

const AUTH_CODE_CELL_COUNT = 5;
const TOTAL_TIMER_SECOND = 180;

type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

type AuthPhoneCodeScreenRouteProps = RouteProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

interface AuthCodeScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
  route: AuthPhoneCodeScreenRouteProps;
}

const AuthPhoneCode: React.FC<AuthCodeScreenProps> = ({navigation, route}) => {
  const [authCode, setAuthCode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIMER_SECOND);

  const phoneNumber = route.params.phoneNumber;
  const countryCode = route.params.countryCode;

  const dispatch = useAppDispatch();
  const throttle = useThrottle();

  const blurOnFulfillRef = useBlurOnFulfill({
    value: authCode,
    cellCount: AUTH_CODE_CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: authCode,
    setValue: setAuthCode,
  });

  const calculateTime = () => {
    const mins = Math.floor((secondsLeft / 60) % 60);
    const seconds = Math.floor(secondsLeft % 60);
    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayMins,
      displaySecs,
    };
  };

  const onChangeAuthCode = (code: string) => {
    const resultCode = blockStringInput(code);
    setAuthCode(resultCode);
    setDisabled(resultCode.length !== AUTH_CODE_CELL_COUNT);
  };

  useEffect(() => {
    if (secondsLeft > 0) {
      BackgroundTimer.runBackgroundTimer(() => {
        setSecondsLeft(secs => secs - 1);
      }, 1000);
      return () => BackgroundTimer.stopBackgroundTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, []);

  const handleReSendCode = async () => {
    try {
      await authService.reSendData();
      setAuthCode("");
      setDisabled(true);
      setSecondsLeft(TOTAL_TIMER_SECOND);
    } catch (error: any) {
      if (error.message === StatusCode.TRY_OVER_ERROR_CODE) {
        showAuthCodeTryOverErrorToast();
      } else {
        throw error;
      }
    }
  };

  const showReSendCodeAlert = () => {
    Alert.alert(
      "인증 번호 재전송",
      "인증 번호를 재전송하시겠습니까?",
      [
        {text: "취소", style: "destructive"},
        {
          text: "재전송",
          onPress: handleReSendCode,
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const handleCheckAuthCode = async () => {
    if (secondsLeft !== 0) {
      try {
        const result = await authService.checkAuthCodeAndReturnPage(
          authCode,
          phoneNumber,
          countryCode,
        );
        if (result) {
          dispatch(setAccessToken(result.accessToken));
          navigation.push(result.nextPage);
        }
      } catch (error: any) {
        if (error.message === StatusCode.NOT_MATCH_AUTHCODE_ERROR_CODE) {
          showAuthCodeMatchErrorToast();
        } else if (error.message === StatusCode.TRY_OVER_ERROR_CODE) {
          showAuthCodeTryOverErrorToast();
        } else {
          throw error;
        }
      }
    } else {
      showAuthCodeTimeOverErrorToast();
    }
  };

  const handleCheckAuthCodeWithThrottle = throttle(handleCheckAuthCode, 2000);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <CustomMainText>인증번호 입력</CustomMainText>
      <CustomSubText>
        {route.params.countryCode} {route.params.phoneNumber}
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
            onPress={handleCheckAuthCodeWithThrottle}
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

export default AuthPhoneCode;
