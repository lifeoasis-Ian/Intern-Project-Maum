import {View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import colors from "../../styles/color.ts";
import React, {useState, useEffect} from "react";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import {useIsFocused} from "@react-navigation/native";
import MainText from "../../components/MainText.tsx";
import useBlockBackHandler from "../../hooks/useBlockBackHandler.tsx";
import {
  getUserDataService,
  permissionService,
  saveService,
} from "../../services";

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
        style={{
          color: isSelected ? colors.main : colors.fontLanguageGray,
          fontSize: 36,
          lineHeight: 36,
          fontWeight: "800",
        }}>
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

const Language: React.FC<LanguageScreenProps> = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [disabled, setDisabled] = useState(true);

  const isFocused = useIsFocused();

  useBlockBackHandler();

  const getLanguageUsingToken = async (token: string) => {
    const savedLanguage = await getUserDataService.getUserLanguage(token);

    switch (savedLanguage.data.language) {
      case "한국어":
        setSelectedLanguage("한국어");
        break;
      case "영어":
        setSelectedLanguage("English");
        break;
      case "일본어":
        setSelectedLanguage("日本語");
        break;
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const token = await getUserDataService.getToken();
          await getLanguageUsingToken(token);
        } catch (error) {
          throw error;
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    setDisabled(!selectedLanguage);
  }, [selectedLanguage]);

  const submitLanguage = async () => {
    const submitToken = await getUserDataService.getToken();
    let changedLanguage = "";
    if (selectedLanguage === "한국어") {
      changedLanguage = "한국어";
    } else if (selectedLanguage === "English") {
      changedLanguage = "영어";
    } else if (selectedLanguage === "日本語") {
      changedLanguage = "일본어";
    }
    const checkPermission =
      await permissionService.checkAndRequestLocationAndMicPermissions();
    if (checkPermission) {
      navigation.push("Home");
    } else {
      navigation.push("Permission");
    }
    await saveService.saveLanguage(changedLanguage, submitToken);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingBottom: 30,
      }}>
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
    </SafeAreaView>
  );
};

export default Language;
