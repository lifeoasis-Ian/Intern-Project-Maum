import {View, Text, SafeAreaView, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigations/navigationTypes.ts";
import colors from "../../styles/color.ts";
import RoundedButton from "../../components/RoundedButton.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import actions from "../../redux/actions";
import {service} from "../../domains";
import {useAppSelector} from "../../redux/hooks";

type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}
const Home: React.FunctionComponent<HomeScreenProps> = props => {
  const [imageUrl, setImageUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [manner, setManner] = useState(0);

  const account = useAppSelector(state => state.account);

  useEffect(() => {
    (async function () {
      const user = await service.user.getUserInfo(account.token);
      setImageUrl(user.avatar);
      setNickname(user.nickname);
      setManner(user.manner_score);
    })();
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();
    await actions.account.resetAll();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: "center",
        paddingBottom: 30,
      }}>
      <View
        style={{
          marginTop: 46,
          flex: 1,
          flexDirection: "row",
          gap: 12,
          marginHorizontal: 30,
        }}>
        <Image
          source={{uri: `https://${imageUrl}`}}
          style={{width: 64, height: 64, borderRadius: 50}}
        />
        <View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              lineHeight: 22.4,
              color: colors.fontBlack,
            }}>
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
      <View
        style={{
          flex: 1,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={["#FFCD88", "#F8537D"]}
          style={{
            width: 203,
            height: 203,
            alignContent: "center",
            justifyContent: "center",
            borderRadius: 100,
          }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              lineHeight: 30,
              fontWeight: "300",
              color: colors.fontWhite,
            }}>
            대화친구
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 64,
              lineHeight: 64,
              fontWeight: "300",
              color: colors.fontWhite,
            }}>
            찾기
          </Text>
        </LinearGradient>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          marginHorizontal: 30,
        }}>
        <RoundedButton
          content="로그아웃"
          onPress={handleLogout}
          buttonStyle={{
            borderRadius: 30,
            paddingHorizontal: 36,
            paddingTop: 22,
            paddingBottom: 18,
            backgroundColor: colors.main,
          }}
          textStyle={{
            color: colors.fontWhite,
            fontSize: 16,
            lineHeight: 18,
            fontWeight: "700",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
