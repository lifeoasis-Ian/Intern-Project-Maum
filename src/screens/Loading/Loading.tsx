import React from "react";
import {Text, View} from "react-native";

const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 20, fontWeight: "700"}}>로딩중...</Text>
    </View>
  );
};

export default Loading;
