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
import Toast from "react-native-toast-message";
import {AuthService} from "../../services/AuthService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainText from "../../components/MainText.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {setNowLanguage} from "../../features/language/languageSlice.ts";
import {GetUserDataService} from "../../services/GetUserDataService.ts";
import {PermissionService} from "../../services/permissionService.ts";
import BackgroundTimer from "react-native-background-timer";

type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

type AuthPhoneCodeScreenRouteProp = RouteProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

interface AuthCodeScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
  route: AuthPhoneCodeScreenRouteProp;
}

const CELL_COUNT = 5;
const TOTAL_SECOND = 180;

const AuthPhoneCode: React.FC<AuthCodeScreenProps> = ({navigation, route}) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [disabled, setDisabled] = useState(true);
  const phoneNumber = route.params.phoneNumber;
  const countryCode = route.params.countryCode;
  const authService = new AuthService();
  const getUserData = new GetUserDataService();
  const dispatch = useAppDispatch();
  const permissionService = new PermissionService();
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECOND);

  const clockify = () => {
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayMins,
      displaySecs,
    };
  };

  const showAuthCodeMatchErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "인증 번호 오류",
      text2: "인증 번호가 올바르지 않습니다!",
    });
  };

  const showAuthCodeTryOverErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "인증 번호 요청 제한",
      text2: "1분 뒤에 다시 시도해주세요!",
    });
  };

  const showAuthCodeTimeOverErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "인증 번호 만료",
      text2: "인증번호를 재발급 해주세요!",
    });
  };

  const onChangeText = (val: string) => {
    setValue(val.replace(/[^0-9]/g, ""));
    setDisabled(val.length !== CELL_COUNT);
  };

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const reSendCode = async () => {
    const reSendDataCode = await authService.reSendData();
    if (reSendDataCode === 429) {
      showAuthCodeTryOverErrorToast();
      return;
    }
    setValue("");
    setDisabled(true);
    setSecondsLeft(TOTAL_SECOND);
  };

  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (error) {
      console.log(error);
    }
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
  }, [secondsLeft]);

  const deleteItem = () => {
    Alert.alert(
      "인증 번호 재전송",
      "인증 번호를 재전송하시겠습니까?",
      [
        {text: "취소", onPress: () => {}, style: "destructive"},
        {
          text: "재전송",
          onPress: () => {
            reSendCode();
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  const checkAuthCode = async () => {
    try {
      const res: any = await authService.sendAuthCode(
        value,
        phoneNumber,
        countryCode,
      );
      if (res === 405) {
        showAuthCodeMatchErrorToast();
      } else if (res.status === 200) {
        const token = res.data.token;
        await storeToken(token);
        const result = await getUserData.getUserLanguage(token);
        const getDBLanguage = result.data.language;
        const permission = await permissionService.checkAndRequestPermissions();
        dispatch(setNowLanguage(getDBLanguage));
        if (getDBLanguage && permission) {
          navigation.push("Home");
        } else if (getDBLanguage && !permission) {
          navigation.push("Permission");
        } else {
          navigation.push("Language");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitAuthCode = () => {
    if (secondsLeft !== 0) {
      checkAuthCode();
    } else {
      showAuthCodeTimeOverErrorToast();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <MainText>인증번호 입력</MainText>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 18,
          lineHeight: 28.8,
          color: colors.fontGray,
          textAlign: "center",
          marginBottom: 10,
        }}>
        {route.params.countryCode} {route.params.phoneNumber}
      </Text>
      {secondsLeft <= 0 ? (
        <TouchableOpacity onPress={reSendCode}>
          <Text
            style={{
              color: colors.fontBlue,
              fontWeight: "500",
              fontSize: 14,
              lineHeight: 14,
              textAlign: "center",
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
          }}>
          {clockify().displayMins}:{clockify().displaySecs}
        </Text>
      )}
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 30,
        }}>
        <CodeField
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
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
            onPress={deleteItem}
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
            onPress={submitAuthCode}
            buttonStyle={{
              opacity: disabled ? 0.7 : 1,
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
