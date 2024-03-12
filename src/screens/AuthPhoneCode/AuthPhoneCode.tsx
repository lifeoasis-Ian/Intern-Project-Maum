import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import colors from "../../styles/color.ts";
import React, {useState, useEffect} from "react";
import {Screens, RootStackParamList} from "../../../App.tsx";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import axios from "axios";
import PopupModal from "../../components/PopupModal.tsx";
import Toast from "react-native-toast-message";

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
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [timeOut, setTimeOut] = useState(false);
  const [backendUrl, setBackendUrl] = useState<string>("");
  const checkPlatform = () => {
    if (Platform.OS === "ios") {
      setBackendUrl("localhost");
    } else {
      setBackendUrl("10.0.2.2");
    }
  };
  const showAuthCodeMathErrorToast = () => {
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
  const reSendData = async () => {
    try {
      checkPlatform();
      const response = await axios.get(`http://${backendUrl}:3000/resend`);
      if (response.status === 200) {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const reSendCode = () => {
    reSendData();
    setValue("");
    setDisabled(true);
    setVisible(false);
    setTimeLeft(MINUTES_IN_MS);
  };

  const {StatusBarManager} = NativeModules;

  useEffect(() => {
    Platform.OS === "ios" &&
      StatusBarManager.getHeight(
        (statusBarFrameData: {height: React.SetStateAction<number>}) => {
          setStatusBarHeight(statusBarFrameData.height);
        },
      );
  }, []);

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

  const fetchData = async () => {
    try {
      checkPlatform();
      const response = await axios.post(`http://${backendUrl}:3000/authcode`, {
        code: value,
      });
      if (response.status === 200) {
      }
    } catch (error: any) {
      if (error.response) {
        const {status} = error.response;
        console.log(`Error status: ${status}`);
        if (status === 429) {
          console.log("잠시 후 다시 시도해주세요.");
          showAuthCodeTryOverErrorToast();
        } else if (status === 405) {
          console.log("인증 실패! 다시 시도해주세요.");
          showAuthCodeMathErrorToast();
        } else {
          console.log("알 수 없는 에러가 발생했습니다.");
        }
      } else {
        console.log("서버에 요청을 보낼 수 없습니다.");
      }
    }
  };

  const onPress = () => {
    if (timeLeft !== 0) {
      fetchData();
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
      <Text
        style={{
          color: colors.fontBlack,
          textAlign: "center",
          fontSize: 28,
          fontWeight: "700",
          marginTop: 20,
        }}>
        인증번호 입력
      </Text>
      <Text
        style={{
          marginTop: 10,
          fontWeight: "500",
          fontSize: 18,
          color: colors.fontGray,
          textAlign: "center",
        }}>
        {route.params.totalPhoneNumber}
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
            onPress={onPress}
            buttonStyle={
              disabled
                ? {
                    opacity: 0.7,
                    borderRadius: 30,
                    paddingHorizontal: 36,
                    paddingTop: 22,
                    paddingBottom: 18,
                    backgroundColor: colors.main,
                  }
                : {
                    borderRadius: 30,
                    paddingHorizontal: 36,
                    paddingTop: 22,
                    paddingBottom: 18,
                    backgroundColor: colors.main,
                  }
            }
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
                  {"시간이 초과되었습니다.\n다시 시도해주세요."}
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
          {visibleError && (
            <PopupModal
              visible={visibleError}
              onClose={() => {
                setVisible(!visibleError);
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
                  {"잘못된 인증 번호 입니다.\n다시 시도해주세요."}
                </Text>
                <RoundedButton
                  content="확인"
                  onPress={() => setVisibleError(!visibleError)}
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

      <Toast />
    </View>
  );
};

export default AuthPhoneCode;
