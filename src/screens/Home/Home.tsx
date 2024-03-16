import {View, Text, TouchableOpacity, Image} from "react-native";
import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {Screens, RootStackParamList} from "../../navigation/navigationTypes.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PermissionService} from "../../services/permissionService.ts";

type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  Screens.Home
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}
const Home: React.FunctionComponent<HomeScreenProps> = props => {
  const {navigation} = props;

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate(Screens.OnBoarding);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <Text>Home 입니다.</Text>
      <View style={{flex: 1}}></View>
      <View style={{alignSelf: "flex-end"}}>
        <RoundedButton
          content="로그아웃"
          onPress={handleLogout}
          buttonStyle={{
            marginBottom: 30,
            marginRight: 30,
            borderRadius: 30,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            backgroundColor: colors.main,
          }}
          textStyle={{color: colors.fontWhite, fontSize: 16, fontWeight: "700"}}
        />
      </View>
    </View>
  );
};

export default Home;
