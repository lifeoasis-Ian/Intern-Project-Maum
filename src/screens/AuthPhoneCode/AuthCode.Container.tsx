import {Alert} from "react-native";
import React, {useEffect, useState} from "react";
import BackgroundTimer from "react-native-background-timer";
import {
  showAuthCodeMatchErrorToast,
  showAuthCodeTimeOverErrorToast,
  showAuthCodeTryOverErrorToast,
} from "../../components/ToastMessages.tsx";
import {StatusCode} from "../../utils/StatusCode.ts";
import {blockStringInput} from "../../utils/blockStringInput.ts";
import {AuthCodeScreenProps} from "./types.ts";
import AuthCodeView from "./AuthCode.View.tsx";
import {service} from "../../domains";
import actions from "../../redux/actions";

const AUTH_CODE_CELL_COUNT = 5;
const TOTAL_TIMER_SECOND = 180;

const AuthCodeContainer: React.FC<AuthCodeScreenProps> = ({
  navigation,
  route,
}) => {
  const [authCode, setAuthCode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIMER_SECOND);
  const [loading, setLoading] = useState(false);

  const {phoneNumber, countryCode} = route.params;

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
      await service.authentication.getAuthCode();
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
    Alert.alert("인증 번호 재전송", "인증 번호를 재전송하시겠습니까?", [
      {text: "취소", style: "destructive"},
      {
        text: "재전송",
        onPress: handleReSendCode,
        style: "cancel",
      },
    ]);
  };

  const handleCheckAuthCode = async () => {
    setLoading(true);
    if (secondsLeft !== 0) {
      try {
        const resultCheckAuthCode = await service.authentication.checkAuthCode(
          authCode,
          phoneNumber,
          countryCode,
        );
        if (resultCheckAuthCode) {
          const token = resultCheckAuthCode;
          await service.authentication.saveTokenAsyncStorage(token);
          await actions.account.saveAccessToken(token);
          await actions.account.isSignIn(token);
        }
      } catch (error: any) {
        if (error.message === StatusCode.NOT_MATCH_AUTHCODE_ERROR_CODE) {
          showAuthCodeMatchErrorToast();
        } else if (error.message === StatusCode.TRY_OVER_ERROR_CODE) {
          showAuthCodeTryOverErrorToast();
        } else {
          throw error;
        }
      } finally {
        setLoading(false);
      }
    } else {
      showAuthCodeTimeOverErrorToast();
    }
  };

  return (
    <AuthCodeView
      calculateTime={calculateTime}
      handleCheckAuthCode={handleCheckAuthCode}
      showReSendCodeAlert={showReSendCodeAlert}
      onChangeAuthCode={onChangeAuthCode}
      handleReSendCode={handleReSendCode}
      disabled={disabled}
      loading={loading}
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      authCode={authCode}
      setAuthCode={setAuthCode}
      secondsLeft={secondsLeft}
    />
  );
};

export default AuthCodeContainer;
