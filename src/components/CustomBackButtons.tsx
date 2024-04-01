import React from "react";
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import {useNavigation} from "@react-navigation/native";
import {NavigationProp} from "@react-navigation/core";
import {RootStackParamList} from "../navigations/navigationTypes.ts";

export const CustomBackButton: React.FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation();
  return (
    <HeaderBackButton
      style={{marginLeft: 0}}
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
      style={{marginLeft: 0}}
      label="이전"
    />
  );
};
