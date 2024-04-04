import React, {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    (async function () {
      const savedAvatar = await service.user.getAvatar(account.token);
      const savedNickname = await service.user.getNickname(account.token);
      const savedManner = await service.user.getMannerScore(account.token);

      // const {payload: avatar} = await actions.user.getAvatar(account.token);
      console.log("avatar : ", user.avatar);

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
