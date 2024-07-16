import { View, Text } from "react-native";
import React from "react";
import SongInfo from "@/components/SongInfo";
import SongArtwork from "@/components/SongArtwork";
import PlayerControls from "@/components/PlayerControls";
import { playlistData } from "@/constants";
import { useTheme } from "react-native-paper";
import { Stack } from "expo-router";
import SongSlider from "@/components/SongSlider";

//TEST: axios

export default function index() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.colors.onBackground }}
      className="h-full"
    >
      <View className="h-full p-4 flex-1 items-center justify-evenly">
        <SongArtwork track={playlistData[0]} />
        <View className="">
          <SongInfo track={playlistData[0]} />
          <SongSlider />
          <PlayerControls />
        </View>
      </View>
      <Stack.Screen options={{ headerShown: false }} />
    </View>
  );
}
