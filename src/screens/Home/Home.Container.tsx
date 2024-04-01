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
import {HomeScreenProps} from "./type.ts";
import HomeView from "./Home.View.tsx";

const HomeContainer: React.FunctionComponent<HomeScreenProps> = props => {
  const [imageUrl, setImageUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [manner, setManner] = useState(0);

  const account = useAppSelector(state => state.account);

  useEffect(() => {
    (async function () {
      const savedAvatar = await service.user.getAvatar(account.token);
      const savedNickname = await service.user.getNickname(account.token);
      const savedManner = await service.user.getMannerScore(account.token);

      setImageUrl(savedAvatar);
      setNickname(savedNickname);
      setManner(savedManner);
    })();
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();
    await actions.account.resetAll();
  }

  return (
    <HomeView
      imageUrl={imageUrl}
      nickname={nickname}
      manner={manner}
      handleLogout={handleLogout}
    />
  );
};

export default HomeContainer;
