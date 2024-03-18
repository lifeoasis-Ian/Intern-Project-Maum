import {View, Text, TouchableOpacity, Alert} from "react-native";
import colors from "../../styles/color.ts";
import React, {useState, useEffect} from "react";
import {Screens, RootStackParamList} from "../../navigation/navigationTypes.ts";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import PopupModal from "../../components/PopupModal.tsx";
import Toast from "react-native-toast-message";
import {AuthService} from "../../services/AuthService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainText from "../../components/MainText.tsx";

type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.AuthPhoneCode
>;

type AuthPhoneCodeScreenRouteProp = RouteProp<
  RootStackParamList,
  Screens.AuthPhoneCode
>;

interface AuthCodeScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
  route: AuthPhoneCodeScreenRouteProp;
}

const CELL_COUNT = 5;

const AuthPhoneCode: React.FC<AuthCodeScreenProps> = ({navigation, route}) => {
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const phoneNumber = route.params.phoneNumber;
  const countryCode = route.params.countryCode;
  const authService = new AuthService();

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

  const onChangeText = (val: string) => {
    setValue(val.replace(/[^0-9]/g, ""));
    setDisabled(val.length !== CELL_COUNT);
  };

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0",
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  const reSendCode = () => {
    authService.reSendData();
    setValue("");
    setDisabled(true);
    setVisible(false);
    setTimeLeft(MINUTES_IN_MS);
  };

  const storeToken = async (value: string) => {
    try {
      console.log("token :", value);
      //줄이기
      const accessToken: string = value;
      await AsyncStorage.setItem("token", accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

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
      console.log(res.status);
      if (res.status === 405) {
        showAuthCodeMatchErrorToast();
      } else if (res.status === 429) {
        showAuthCodeTryOverErrorToast();
      } else if (res.status === 200) {
        const token = res.data.token;
        storeToken(token);
        navigation.push("Language");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitAuthCode = () => {
    if (timeLeft !== 0) {
      checkAuthCode();
    } else {
      setVisible(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <MainText>인증번호 입력</MainText>
      <Text
        style={{
          marginTop: 10,
          fontWeight: "500",
          fontSize: 18,
          color: colors.fontGray,
          textAlign: "center",
        }}>
        {route.params.countryCode} {route.params.phoneNumber}
      </Text>
      <View
        style={{
          alignItems: "center",
          marginTop: 16,
        }}>
        {timeLeft <= 0 ? (
          <TouchableOpacity onPress={reSendCode}>
            <Text
              style={{color: colors.fontBlue, fontWeight: "500", fontSize: 14}}>
              인증 문자 다시 받기
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{color: colors.main, fontWeight: "500", fontSize: 14}}>
            {minutes}:{second}
          </Text>
        )}
        <CodeField
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          rootStyle={{
            marginTop: 42,
            height: 60,
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
                  width: 55,
                  height: 50,
                  borderBottomColor: symbol ? colors.main : colors.fontGray,
                  borderBottomWidth: 2,
                  marginHorizontal: 6,
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
            paddingHorizontal: 30,
          }}>
          <RoundedButton
            content="인증 문자가 오지 않나요?"
            onPress={deleteItem}
            buttonStyle={{
              opacity: 0.9,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingTop: 6,
              paddingBottom: 5,
              backgroundColor: "#EAEAEA",
              marginBottom: 30,
            }}
            textStyle={{
              color: colors.fontGray,
              fontWeight: "700",
              fontSize: 12,
            }}
          />

          <RoundedButton
            disabled={disabled}
            content="확인"
            onPress={submitAuthCode}
            buttonStyle={{
              opacity: disabled ? 0.7 : 1,
              borderRadius: 30,
              paddingHorizontal: 36,
              paddingTop: 22,
              paddingBottom: 18,
              backgroundColor: colors.main,
            }}
            textStyle={{
              color: colors.fontWhite,
              fontSize: 20,
              fontWeight: "700",
            }}
          />
          {visible && (
            <PopupModal
              visible={visible}
              onClose={() => {
                setVisible(!visible);
              }}>
              <View
                style={{
                  backgroundColor: colors.backgroundColor,
                  paddingHorizontal: 80,
                  paddingVertical: 50,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontWeight: "700",
                    marginBottom: 20,
                    textAlign: "center",
                    lineHeight: 26.6,
                  }}>
                  {"시간이 초과되었습니다.\n인증 번호 재발급을 진행해주세요."}
                </Text>
                <RoundedButton
                  content="확인"
                  onPress={() => setVisible(!visible)}
                  buttonStyle={{
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: colors.main,
                  }}
                  textStyle={{
                    color: colors.fontWhite,
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                />
              </View>
            </PopupModal>
          )}
        </View>
      </View>
    </View>
  );
};

export default AuthPhoneCode;
