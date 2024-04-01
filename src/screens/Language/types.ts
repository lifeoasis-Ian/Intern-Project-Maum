import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import {Dispatch, SetStateAction} from "react";

export type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

export interface LanguageScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
}

export interface LanguageOptionProps {
  label: string;
  isSelected: boolean;
  onSelect: (label: string) => void;
}

export interface AuthCodeParamsProps {
  handleSubmitLanguage: () => Promise<void>;
  handleSelectLanguage: (nowLanguage: string) => void;
  disabled: boolean;
  selectedLanguage: string;
}
