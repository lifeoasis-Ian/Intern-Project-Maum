import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import {RouteProp} from "@react-navigation/native";
import {Dispatch, SetStateAction} from "react";

export type AuthPhoneCodeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

export type AuthPhoneCodeScreenRouteProps = RouteProp<
  RootStackParamList,
  "AuthPhoneCode"
>;

type CalculateTimeReturnType = {
  displayMins: string | number;
  displaySecs: string | number;
};

export interface AuthCodeScreenProps {
  navigation: AuthPhoneCodeScreenNavigationProps;
  route: AuthPhoneCodeScreenRouteProps;
}
export interface AuthCodeParamsProps {
  calculateTime: () => CalculateTimeReturnType;
  handleCheckAuthCode: () => void;
  showReSendCodeAlert: () => void;
  onChangeAuthCode: (code: string) => void;
  handleReSendCode: () => void;
  disabled: boolean;
  loading: boolean;
  countryCode: string;
  phoneNumber: string;
  authCode: string;
  setAuthCode: Dispatch<SetStateAction<string>>;
  secondsLeft: number;
}
