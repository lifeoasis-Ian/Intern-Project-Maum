import {StyleSheet} from "react-native";
import colors from "../../styles/color.ts";

export const OnBoardingStyle = StyleSheet.create({
  onBoardingLayout: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    marginTop: 100,
  },
  mainText: {
    color: colors.fontBlack,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
  },
  subText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "300",
    color: colors.fontGray,
    textAlign: "center",
    lineHeight: 28.8,
  },

  bottomTextLayout: {
    marginBottom: 40,
  },

  bottomText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.fontGray,
  },
});
