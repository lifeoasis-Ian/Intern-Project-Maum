import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import colors from "../../styles/color.ts";
import React, {useState, useEffect} from "react";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp, useFocusEffect, useRoute} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import {SaveService} from "../../services/SaveService.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";
import {GetUserDataService} from "../../services/GetUserDataService.ts";
import MainText from "../../components/MainText.tsx";
import {PermissionService} from "../../services/permissionService.ts";

type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

type LanguageScreenRouteProp = RouteProp<RootStackParamList, "Language">;

interface LanguageScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
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
  <View style={{flexDirection: "row"}}>
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
    {isSelected ? (
      <View
        style={{
          backgroundColor: "#FAE7E9",
          marginLeft: 12,
          paddingHorizontal: 10,
          paddingTop: 6,
          paddingBottom: 5,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: colors.main,
            fontWeight: "700",
            fontSize: 12,
            lineHeight: 19.2,
          }}>
          1순위, 가장 능숙해요
        </Text>
      </View>
    ) : null}
  </View>
);

export const getToken = async (key: string) => {
  const res = await AsyncStorage.getItem(key);
  if (res !== null) {
    return res;
  } else {
    return "";
  }
};

const Language: React.FC<LanguageScreenProps> = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [accessToken, setAccessToken] = useState("");
  const [disabled, setDisabled] = useState(true);
  const saveService = new SaveService();
  const getUserDataService = new GetUserDataService();
  const isFocused = useIsFocused();
  const routesParams = useRoute();
  const permissionService = new PermissionService();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const token = await getToken("token");
          await getLanguageUsingToken(token);
          await setAccessToken(token);
        } catch (error) {
          console.error("Error in useEffect:", error);
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    setDisabled(!selectedLanguage);
  }, [selectedLanguage]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return routesParams.name === "Language";
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const getLanguageUsingToken = async (token: string) => {
    try {
      const savedLanguage = await getUserDataService.getUserLanguage(token);
      if (savedLanguage.data.language === "한국어") {
        setSelectedLanguage("한국어");
        setDisabled(false);
      } else if (savedLanguage.data.language === "영어") {
        setSelectedLanguage("English");
        setDisabled(false);
      } else if (savedLanguage.data.language === "일본어") {
        setSelectedLanguage("日本語");
        setDisabled(false);
      } else {
        setSelectedLanguage("");
        setDisabled(true);
      }
    } catch (error) {
      console.error(error);
      setSelectedLanguage("");
      setDisabled(true);
    }
  };

  const submitLanguage = async () => {
    const submitToken = await getToken("token");

    let changedLanguage = "";

    if (selectedLanguage === "한국어") {
      changedLanguage = "한국어";
    } else if (selectedLanguage === "English") {
      changedLanguage = "영어";
    } else if (selectedLanguage === "日本語") {
      changedLanguage = "일본어";
    }

    try {
      const checkPermission =
        await permissionService.checkAndRequestPermissions();
      if (checkPermission) {
        navigation.push("Home");
      } else {
        navigation.push("Permission");
      }
      await saveService.saveLanguage(changedLanguage, submitToken);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(prev => {
      if (prev === language) {
        return "";
      } else if (prev === "") {
        return language;
      } else {
        return prev;
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <MainText>언어 선택</MainText>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 18,
          color: colors.fontGray,
          textAlign: "center",
          lineHeight: 28.8,
        }}>
        {"가능한 언어를 모두 선택하세요\n선택한 언어의 친구와 연결돼요"}
      </Text>
      <View
        style={{
          flex: 1,
          gap: 24,
          marginTop: 52,
          marginHorizontal: 30,
        }}>
        {languages.map(language => (
          <LanguageOption
            key={language}
            label={language}
            isSelected={selectedLanguage === language}
            onSelect={handleSelectLanguage}
          />
        ))}
      </View>
      <View
        style={{
          alignItems: "flex-end",
          marginHorizontal: 30,
        }}>
        <RoundedButton
          disabled={disabled}
          content="다음"
          onPress={submitLanguage}
          buttonStyle={{
            opacity: disabled ? 0.6 : 1,
            marginBottom: 30,
            borderRadius: 30,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            backgroundColor: colors.main,
          }}
          textStyle={{
            textAlign: "center",
            color: colors.fontWhite,
            fontSize: 20,
            lineHeight: 20,
            fontWeight: "700",
          }}
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
