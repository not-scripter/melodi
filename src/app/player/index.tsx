import PlayerControls from "@/components/PlayerControls";
import SongArtwork from "@/components/SongArtwork";
import SongInfo from "@/components/SongInfo";
import SongSlider from "@/components/SongSlider";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import { Track, useActiveTrack } from "react-native-track-player";

export default function index() {
  const [imageColors, setimageColors] = useState<ImageColorsResult>();
  const bgColor = imageColors
    ? imageColors.platform === "ios"
      ? imageColors.background
      : imageColors.dominant
    : "#000";

  const track: Track | undefined = useActiveTrack();

  const getImageColors = async () => {
    const response =
      track?.artwork && (await ImageColors.getColors(track?.artwork));
    if (response) {
      setimageColors(response);
    }
  };

  useEffect(() => {
    getImageColors();
  }, [track]);

  return (
    <View
      style={{
        backgroundColor: bgColor,
      }}
      className="h-full"
    >
      <View className="h-full p-4 flex-1 items-center justify-evenly">
        <SongArtwork track={track} />
        <View className="">
          <SongInfo track={track} />
          <SongSlider />
          <PlayerControls />
        </View>
      </View>
    </View>
  );
}
