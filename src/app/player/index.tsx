import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SongInfo from "@/components/SongInfo";
import SongArtwork from "@/components/SongArtwork";
import PlayerControls from "@/components/PlayerControls";
import { playlistData } from "@/constants";
import { Stack } from "expo-router";
import SongSlider from "@/components/SongSlider";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";

export default function index() {
  const [imageColors, setimageColors] = useState<ImageColorsResult>();

  const getImageColors = async (url: any) => {
    const response = await ImageColors.getColors(url);
    setimageColors(response);
  };

  useEffect(() => {
    getImageColors(playlistData[2].artwork);
  }, []);
  console.log();

  return (
    <View
      style={{
        backgroundColor:
          imageColors?.platform === "ios"
            ? imageColors.background
            : imageColors?.dominant,
      }}
      className="h-full"
    >
      <View className="h-full p-4 flex-1 items-center justify-evenly">
        <SongArtwork track={playlistData[2]} />
        <View className="">
          <SongInfo track={playlistData[2]} />
          <SongSlider />
          <PlayerControls />
        </View>
      </View>
      <Stack.Screen options={{ headerShown: false }} />
    </View>
  );
}
