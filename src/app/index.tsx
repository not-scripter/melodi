import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function index() {
  const theme = useTheme();

  const getmusic = async () => {
    // const res = await getYtMusic("qnQCd_nZn_g");
    // console.log(res);
    // const music = await ytdl.getBasicInfo(
    //   "https://music.youtube.com/watch?v=i8VAQ8Cy5rs",
    // );
    //
    // console.log(music);
  };

  return (
    <ScrollView
      className="h-full"
      style={{ backgroundColor: theme.colors.onBackground }}
    >
      <Link push href="/player">
        <Button mode="elevated">Player</Button>
      </Link>
      <Button mode="elevated" onPress={() => getmusic()}>
        Fetch
      </Button>
      <View>{}</View>
    </ScrollView>
  );
}
