import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface MyButtonProps extends TouchableOpacityProps {
  content: string; // 필수
  onPress: () => void;
  disabled?: boolean;
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
}

const RoundedButton: React.FC<MyButtonProps> = ({
  content,
  onPress,
  disabled,
  textStyle,
  buttonStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={buttonStyle}
      {...rest}>
      <Text style={textStyle}>{content}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
