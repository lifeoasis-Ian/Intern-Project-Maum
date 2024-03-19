import {View, Text, TouchableOpacity, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/navigationTypes.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GetUserDataService} from "../../services/GetUserDataService.ts";
import {getToken} from "../Language/Language.tsx";
import LinearGradient from "react-native-linear-gradient";

type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}
const Home: React.FunctionComponent<HomeScreenProps> = props => {
  const {navigation} = props;
  const getUserData = new GetUserDataService();
  const [imageUrl, setImageUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [manner, setManner] = useState(0);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("OnBoarding");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async function () {
      const token = await getToken("token");
      const avatarResult = await getUserData.getUserAvatar(token);
      const nicknameResult = await getUserData.getUserNickname(token);
      const mannerResult = await getUserData.getUserMannerScore(token);
      setImageUrl(avatarResult.data.avatar);
      setNickname(nicknameResult.data.nickname);
      setManner(mannerResult.data.mannerScore);
    })();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 12,
          marginLeft: 30,
        }}>
        <Image
          source={{uri: `https://${imageUrl}`}}
          style={{width: 64, height: 64, borderRadius: 50}}
        />
        <View>
          <Text style={{fontWeight: "600", fontSize: 14, lineHeight: 22.4}}>
            {nickname}
          </Text>
          <Text
            style={{
              color: colors.fontGray,
              fontWeight: "400",
              fontSize: 12,
              lineHeight: 19.2,
            }}>
            🇰🇷대한민국, 서울시
          </Text>
          <Text
            style={{
              color: colors.fontGray,
              fontWeight: "400",
              fontSize: 12,
              lineHeight: 19.2,
            }}>
            😍 {manner}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: "center"}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={["#FFCD88", "#F8537D"]}
          style={{
            width: 200,
            height: 200,
            alignContent: "center",
            justifyContent: "center",
            borderRadius: 100,
          }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "300",
              color: colors.fontWhite,
            }}>
            대화친구
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 64,
              fontWeight: "300",
              color: colors.fontWhite,
            }}>
            찾기
          </Text>
        </LinearGradient>
      </View>

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
