import React from "react";
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import {Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NavigationProp} from "@react-navigation/core";
import {RootStackParamList} from "../navigation/navigationTypes.ts";

export const CustomBackButton: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation();
  return (
    <HeaderBackButton
      style={{marginLeft: Platform.OS === "ios" ? 10 : 0}}
      onPress={() => navigation.goBack()}
      label="이전"
    />
  );
};

export const CustomBackButtonInPermission: React.FC<
  HeaderBackButtonProps
> = props => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <HeaderBackButton
      onPress={() => navigation.navigate("Language")}
      style={{marginLeft: Platform.OS === "ios" ? 10 : 0}}
      label="이전"
    />
  );
};