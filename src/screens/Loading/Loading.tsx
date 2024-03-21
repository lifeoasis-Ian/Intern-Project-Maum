import React from "react";
import {Image, Text, View} from "react-native";
import colors from "../../styles/color.ts";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundColor,
      }}>
      <Image
        source={require("../../assets/maum.png")}
        style={{height: 30, objectFit: "contain"}}
      />
    </View>
  );
};

export default Loading;
