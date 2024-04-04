import React from "react";
import OnBoardingView from "./OnBoarding.View.tsx";
import {MainScreenProps} from "./types.ts";

const OnBoardingContainer: React.FC<MainScreenProps> = props => {
  const navigation = props.navigation;

  const handleMoveNext = (): void => {
    navigation.navigate("AuthPhone");
  };

  return <OnBoardingView handleMoveNext={handleMoveNext} />;
};

export default OnBoardingContainer;
