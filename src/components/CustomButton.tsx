import Typography, {TypographyProps} from "./Typography.tsx";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/color.ts";
import React from "react";

interface CustomButtonProps extends TouchableOpacityProps {
  contents: string;
  style?: StyleProp<TextStyle>;
  backgroundColor?:
    | "backgroundMain"
    | "backgroundMainDisabled"
    | "backgroundGray";
  color?: TypographyProps["color"];
  size?: number;
  rounded?: "large" | "normal" | "small" | "x-small";
  bold?: TypographyProps["bold"];
  onPress?: () => void;
  disabled?: boolean;
  lineHeight?: number;
}
export const CustomButton: React.FC<CustomButtonProps> = props => {
  const {
    contents,
    size = 20,
    color = "white",
    backgroundColor = "backgroundMain",
    rounded,
    bold,
    style,
    onPress,
    disabled,
    lineHeight,
  } = props;

  function getBackgroundColor() {
    switch (backgroundColor) {
      case "backgroundMain":
        return colors.backgroundMain;
      case "backgroundGray":
        return colors.backgroundGray;
    }
  }

  function getRounded() {
    switch (rounded) {
      case "large":
        return 45;
      case "normal":
        return 30;
      case "small":
        return 15;
      case "x-small":
        return 10;
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          opacity: disabled ? 0.6 : 1,
          backgroundColor: getBackgroundColor(),
          borderRadius: getRounded(),
        },
        style,
      ]}>
      <Typography
        text={contents}
        size={size}
        color={color}
        center={true}
        bold={bold}
        lineHeight={lineHeight}
      />
    </TouchableOpacity>
  );
};
