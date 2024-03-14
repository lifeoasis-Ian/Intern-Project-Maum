import React from "react";
import {Text, View} from "react-native";
import colors from "../../styles/color.ts";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList, Screens} from "../../../App.tsx";

type PermissionScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.Permission
>;

interface PermissionScreenProps {
  navigation: PermissionScreenNavigationProps;
}

const Permission: React.FC<PermissionScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <Text>안녕</Text>
    </View>
  );
};

export default Permission;
