import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import React, {Dispatch, SetStateAction} from "react";
import {Modalize} from "react-native-modalize";

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
