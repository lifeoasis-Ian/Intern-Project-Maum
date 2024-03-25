import React from "react";
import {Text, TextProps, StyleSheet} from "react-native";
import colors from "../styles/color.ts";

interface MainTextProps extends TextProps {
  children: React.ReactNode;
}

interface SubTextProps extends TextProps {
  children: React.ReactNode;
}

export const CustomMainText: React.FC<MainTextProps> = ({children}) => (
  <Text style={styles.defaultMainTextStyle}>{children}</Text>
);

export const CustomSubText: React.FC<SubTextProps> = ({children}) => (
  <Text style={styles.defaultSubTextStyle}>{children}</Text>
);

const styles = StyleSheet.create({
  defaultMainTextStyle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: colors.fontBlack,
    lineHeight: 42,
  },
  defaultSubTextStyle: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 28.8,
    fontWeight: "500",
    color: colors.fontGray,
  },
});
