import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  NativeModules,
} from "react-native";
import React, {useState, useEffect} from "react";
import {CountryPicker} from "react-native-country-codes-picker";
import colors from "../../styles/color.ts";
import {Screens, RootStackParamList} from "../../../App.tsx";
import {StackNavigationProp} from "@react-navigation/stack";
import RoundedButton from "../../components/RoundedButton.tsx";
import axios from "axios";

type AuthPhoneScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.AuthPhone
>;

interface AuthScreenProps {
  navigation: AuthPhoneScreenNavigationProps;
}

const TopLayout = () => {
  return (
    <View
      style={{
        marginTop: 30,
        alignItems: "center",
      }}>
      <Image
        source={require("../../assets/auth_icon.png")}
        style={{height: 40, objectFit: "contain"}}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "700",
          color: colors.fontBlack,
          marginTop: 15,
        }}>
        전화번호 가입
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          lineHeight: 28.8,
          fontWeight: "400",
          marginTop: 10,
          color: colors.fontGray,
        }}>
        {"안심하세요! 번호는 암호화되며,\n절대 공개되지 않아요."}
      </Text>
    </View>
  );
};

const AuthPhone: React.FC<AuthScreenProps> = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+82");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [totalPhoneNumber, setTotalPhoneNumber] = useState("");
  const [backendUrl, setBackendUrl] = useState<string>("");

  const checkPlatform = () => {
    if (Platform.OS === "ios") {
      setBackendUrl("localhost");
    } else {
      setBackendUrl("10.0.2.2");
    }
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
    buttonDisabled();
    setTotalPhoneNumber(countryCode + " " + phoneNumber);
  }, [phoneNumber, countryCode]);

  const onlyNum = (phoneNumber: string) => {
    return setPhoneNumber(phoneNumber.replace(/[^0-9]/g, ""));
  };

  const buttonDisabled = () => {
    if (phoneNumber.length >= 11) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const fetchData = async () => {
    try {
      checkPlatform();
      console.log(totalPhoneNumber);
      const response = await axios.post(`http://${backendUrl}:3000/phone`, {
        phoneNumber: phoneNumber,
        nationCode: countryCode,
      });
      console.log(response.status);
      if (response.status === 200) {
        navigation.navigate("AuthPhoneCode", {phoneNumber, countryCode});
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPress = () => {
    fetchData();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      <TopLayout />
      <>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginTop: 50,
          }}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 5,
              paddingBottom: 16,
              paddingRight: 12,
              borderBottomWidth: 2,
              borderStyle: "solid",
              borderBottomColor: colors.main,
            }}>
            <Text
              style={{
                color: colors.fontBlack,
                fontSize: 18,
                paddingLeft: 5,
              }}>
              {countryCode}
            </Text>
            <Image
              source={require("../../assets/arr.png")}
              style={{
                objectFit: "contain",
                height: 14,
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
              paddingBottom: 10,
              borderBottomWidth: 2,
              borderStyle: "solid",
              borderBottomColor: colors.main,
            }}
            keyboardType={"numeric"}
            value={phoneNumber}
            onChangeText={onlyNum}
          />
        </View>

        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: 30,
            marginLeft: 163,
            marginBottom: 40,
          }}
          behavior={"padding"}
          keyboardVerticalOffset={statusBarHeight + 60}>
          <RoundedButton
            disabled={disabled}
            content="인증번호 받기"
            onPress={onPress}
            buttonStyle={
              disabled
                ? {
                    borderRadius: 30,
                    backgroundColor: colors.main,
                    opacity: 0.6,
                    paddingHorizontal: 36,
                    paddingTop: 22,
                    paddingBottom: 18,
                  }
                : {
                    borderRadius: 30,
                    backgroundColor: colors.main,
                    paddingHorizontal: 36,
                    paddingTop: 22,
                    paddingBottom: 18,
                  }
            }
            textStyle={{
              color: colors.fontWhite,
              fontSize: 20,
              fontWeight: "700",
            }}
          />
        </KeyboardAvoidingView>
      </>
    </View>
  );
};

export default AuthPhone;
