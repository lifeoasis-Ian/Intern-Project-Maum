import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import {Dispatch, SetStateAction} from "react";

export type AuthPhoneScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "AuthPhone"
>;

export interface AuthScreenProps {
  navigation: AuthPhoneScreenNavigationProps;
}
export interface AuthPhoneProps {
  handleGetAuthCode: () => void;
  onChangePhoneNumber: (phone: string) => void;
  disabled: boolean;
  headerHeight: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  countryCode: string;
  setCountryCode: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
}
