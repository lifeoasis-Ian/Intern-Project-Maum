import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";

export type OnboardingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "OnBoarding"
>;

export interface MainScreenProps {
  navigation: OnboardingScreenNavigationProps;
}

export interface OnBoardingViewProps {
  handleMoveNext: () => void;
}
