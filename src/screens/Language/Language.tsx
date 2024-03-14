import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from "react-native";
import colors from "../../styles/color.ts";
import React, {useState, useEffect} from "react";
import {Screens, RootStackParamList} from "../../../App.tsx";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import {SaveService} from "../../api/SaveService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {GetUserDataService} from "../../api/GetUserDataService.ts";

type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.AuthPhoneCode
>;

type LanguageScreenRouteProp = RouteProp<RootStackParamList, Screens.Language>;

interface LanguageScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
  route: LanguageScreenRouteProp;
}
const languages: string[] = ["한국어", "English", "日本語"];

interface LanguageOptionProps {
  label: string;
  isSelected: boolean;
  onSelect: (label: string) => void;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
  label,
  isSelected,
  onSelect,
}) => (
  <>
    <TouchableOpacity
      style={{alignSelf: "flex-start"}}
      onPress={() => onSelect(label)}>
      <Text
        style={[
          styles.languageText,
          {color: isSelected ? colors.main : colors.fontLanguageGray},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  </>
);

const Language: React.FC<LanguageScreenProps> = ({navigation, route}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [accessToken, setAccessToken] = useState("");
  const [disabled, setDisabled] = useState(true);
  const saveService = new SaveService();
  const getUserDataService = new GetUserDataService();
  const getItem = async (key: string) => {
    const res = await AsyncStorage.getItem(key);
    if (res !== null) {
      console.log("getItem: ", res);
      return res;
    } else {
      return "";
    }
  };

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("token");
      setSelectedLanguage("");
      setAccessToken("");
      navigation.navigate("OnBoarding");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const token = await getItem("token");
      await setAccessToken(token);
      if (token) {
        await getLanguageUsingToken(token);
      }
    })();
  }, [navigation]);

  const getLanguageUsingToken = async (token: string) => {
    try {
      const savedLanguage = await getUserDataService.getUserLanguage(token);
      if (savedLanguage.data.language === "한국어") {
        await setSelectedLanguage("한국어");
        await setDisabled(false);
      } else if (savedLanguage.data.language === "영어") {
        await setSelectedLanguage("English");
        await setDisabled(false);
      } else if (savedLanguage.data.language === "일본어") {
        await setSelectedLanguage("日本語");
        await setDisabled(false);
      } else {
        await setSelectedLanguage("");
        await setDisabled(true);
      }
    } catch (error) {
      console.error(error);
      await setSelectedLanguage("");
      await setDisabled(true);
    }
  };

  const submitLanguage = async () => {
    const submitToken = await getItem("token");

    let changedLanguage = "";

    if (selectedLanguage === "한국어") {
      changedLanguage = "한국어";
    } else if (selectedLanguage === "English") {
      changedLanguage = "영어";
    } else if (selectedLanguage === "日本語") {
      changedLanguage = "일본어";
    }
    try {
      await navigation.navigate(Screens.Permission);
      await saveService.saveLanguage(changedLanguage, submitToken);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectLanguage = async (language: string) => {
    if (selectedLanguage === language) {
      await setSelectedLanguage("");
      await setDisabled(true);
    } else if (!selectedLanguage) {
      await setSelectedLanguage(language);
      await setDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>언어 선택</Text>
      <Text style={styles.subtitle}>
        {"가능한 언어를 모두 선택하세요\n선택한 언어의 친구와 연결돼요"}
      </Text>
      <View style={styles.languageList}>
        {languages.map(language => (
          <LanguageOption
            key={language}
            label={language}
            isSelected={selectedLanguage === language}
            onSelect={handleSelectLanguage}
          />
        ))}
      </View>
      <View style={{alignItems: "flex-end"}}>
        <RoundedButton
          disabled={disabled}
          content="로그아웃"
          onPress={handleLogout}
          buttonStyle={{
            opacity: disabled ? 0.6 : 1,
            marginBottom: 30,
            marginRight: 30,
            borderRadius: 30,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            backgroundColor: colors.main,
          }}
          textStyle={styles.buttonText}
        />
        <RoundedButton
          disabled={disabled}
          content="다음"
          onPress={submitLanguage}
          buttonStyle={{
            opacity: disabled ? 0.6 : 1,
            marginBottom: 30,
            marginRight: 30,
            borderRadius: 30,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            backgroundColor: colors.main,
          }}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  title: {
    color: colors.fontBlack,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "500",
    fontSize: 18,
    color: colors.fontGray,
    textAlign: "center",
    lineHeight: 28.8,
  },
  languageList: {
    flex: 1,
    gap: 24,
    marginTop: 52,
    marginLeft: 30,
  },
  languageText: {
    fontSize: 36,
    lineHeight: 36,
    fontWeight: "800",
  },
  buttonText: {
    textAlign: "center",
    color: colors.fontWhite,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Language;
