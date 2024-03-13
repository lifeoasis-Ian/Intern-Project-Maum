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
import axios from "axios";
import {SaveService} from "../../api/SaveService.ts";

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
  const saveService = new SaveService();

  const submitLanguage = async () => {
    let changedLanguage = "";

    if (selectedLanguage === "한국어") {
      changedLanguage = "한국어";
    } else if (selectedLanguage === "English") {
      changedLanguage = "영어";
    } else if (selectedLanguage === "日本語") {
      changedLanguage = "일본어";
    }

    try {
      await saveService
        .saveData(
          route.params.phoneNumber,
          route.params.countryCode,
          changedLanguage,
        )
        .then(res => {
          console.log("굿!");
          console.log(changedLanguage);
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectLanguage = (language: string) => {
    if (selectedLanguage === language) {
      setSelectedLanguage("");
    } else if (!selectedLanguage) {
      setSelectedLanguage(language);
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
          disabled={false}
          content="다음"
          onPress={submitLanguage}
          buttonStyle={{
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
