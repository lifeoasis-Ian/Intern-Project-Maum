import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import {Dispatch, SetStateAction} from "react";

export type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

export interface HomeParamsProps {
  imageUrl: string;
  nickname: string;
  manner: number;
  handleLogout: () => void;
}
