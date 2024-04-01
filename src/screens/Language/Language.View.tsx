import {View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import colors from "../../styles/color.ts";
import React, {useState, useEffect} from "react";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import RoundedButton from "../../components/RoundedButton.tsx";
import {useIsFocused} from "@react-navigation/native";
import {CustomMainText, CustomSubText} from "../../components/Texts.tsx";
import {
  AuthCodeParamsProps,
  LanguageOptionProps,
  LanguageScreenProps,
} from "./types.ts";

const languages: string[] = ["한국어", "English", "日本語"];

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

const LanguageView: React.FC<AuthCodeParamsProps> = ({
  handleSelectLanguage,
  handleSubmitLanguage,
  selectedLanguage,
  disabled,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingBottom: 30,
      }}>
      <CustomMainText>언어 선택</CustomMainText>
      <CustomSubText>
        {"가능한 언어를 모두 선택하세요\n선택한 언어의 친구와 연결돼요"}
      </CustomSubText>
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
          onPress={handleSubmitLanguage}
          buttonStyle={{
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

export default LanguageView;
