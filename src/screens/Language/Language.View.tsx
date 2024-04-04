import {View, TouchableOpacity, SafeAreaView} from "react-native";
import colors from "../../styles/color.ts";
import React from "react";
import {
  AuthCodeParamsProps,
  LanguageOptionProps,
  LanguageScreenProps,
} from "./types.ts";
import Typography from "../../components/Typography.tsx";

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
      <Typography
        type={"initial"}
        size={36}
        lineHeight={1}
        bold={"800"}
        text={label}
        color={isSelected ? "main" : "light-gray"}
      />
    </TouchableOpacity>
    {isSelected && (
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#FAE7E9",
          marginLeft: 12,
          paddingHorizontal: 10,
          paddingTop: 6,
          paddingBottom: 5,
          borderRadius: 10,
          marginBottom: 5,
        }}>
        <Typography
          text={"1순위, 가장 능숙해요"}
          type={"initial"}
          size={12}
          lineHeight={1.6}
          bold={"700"}
          color={"main"}
        />
      </View>
    )}
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
      <Typography
        text={"언어 선택"}
        type={"main"}
        center={true}
        color={"black"}
        lineHeight={1.5}
      />
      <Typography
        type={"sub"}
        center={true}
        color={"dark-gray"}
        lineHeight={1.6}
        text={"가능한 언어를 모두 선택하세요\n선택한 언어의 친구와 연결돼요"}
      />
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
        {/*<RoundedButton*/}
        {/*  disabled={disabled}*/}
        {/*  content="다음"*/}
        {/*  onPress={handleSubmitLanguage}*/}
        {/*  buttonStyle={{*/}
        {/*    borderRadius: 30,*/}
        {/*    paddingHorizontal: 36,*/}
        {/*    paddingTop: 22,*/}
        {/*    paddingBottom: 18,*/}
        {/*    backgroundColor: colors.main,*/}
        {/*  }}*/}
        {/*  textStyle={{*/}
        {/*    textAlign: "center",*/}
        {/*    color: colors.fontWhite,*/}
        {/*    fontSize: 20,*/}
        {/*    lineHeight: 20,*/}
        {/*    fontWeight: "700",*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    </SafeAreaView>
  );
};

export default LanguageView;
