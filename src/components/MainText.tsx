import React from "react";
import {Text, TextProps, StyleSheet} from "react-native";
import colors from "../styles/color.ts";

interface MainTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText: React.FC<MainTextProps> = ({children}) => (
  <Text style={styles.defaultMainTextStyle}>{children}</Text>
);

const styles = StyleSheet.create({
  defaultMainTextStyle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: colors.fontBlack,
    lineHeight: 42,
  },
});

export default CustomText;
