import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function index() {
  const theme = useAppTheme();

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
    <View
      className="h-full flex items-center justify-center gap-4"
      style={{ backgroundColor: theme.colors.onBackground }}
    >
      <Link href="/player">
        <Button mode="elevated">Player</Button>
      </Link>
      <Link href="/test/pan">
        <Button mode="elevated">Pan test</Button>
      </Link>
      <Link href="/test/swip">
        <Button mode="elevated">Swip test</Button>
      </Link>
    </View>
  );
}
