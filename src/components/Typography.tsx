import {
  StyleProp,
  Text,
  TextInputChangeEventData,
  TextProps,
  TextStyle,
} from "react-native";
import React, {PropsWithChildren} from "react";
import colors from "../styles/color.ts";

export interface TypographyProps {
  color?: "black" | "main" | "light-gray" | "dark-gray" | "white" | "blue";
  style?: StyleProp<TextStyle>;
  bold?: "300" | "400" | "500" | "600" | "700" | "800";
  size?: number;
  lineHeight?: number;
  center?: boolean;
  text: string;
  type?: "main" | "sub" | "initial";
}

const Typography: React.FC<PropsWithChildren<TypographyProps>> = props => {
  const {text, color, style, bold, size = 12, lineHeight, center, type} = props;

  function getColor() {
    switch (color) {
      case "black":
        return colors.fontBlack;
      case "main":
        return colors.main;
      case "light-gray":
        return colors.fontLightGray;
      case "dark-gray":
        return colors.fontGray;
      case "white":
        return colors.fontWhite;
      case "blue":
        return colors.fontBlue;
      default:
        return undefined;
    }
  }

  function isCenter(): "center" | undefined {
    if (center) {
      return "center";
    } else {
      return undefined;
    }
  }

  function getLineHeight(size: number) {
    if (lineHeight) {
      return size * lineHeight;
    }
    return undefined;
  }

  function getType(): TextStyle {
    switch (type) {
      case "main":
        return {
          fontSize: 28,
          lineHeight: getLineHeight(28),
          fontWeight: "700",
        };
      case "sub":
        return {
          fontSize: 18,
          lineHeight: getLineHeight(18),
          fontWeight: "500",
        };
      default:
        return {
          fontWeight: bold,
          fontSize: size,
          lineHeight: getLineHeight(size),
        };
    }
  }

  return (
    <Text
      style={[
        {
          ...getType(),
          color: getColor(),
          textAlign: isCenter(),
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default Typography;
