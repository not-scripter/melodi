import PlayerControls from "@/components/PlayerControls";
import SongArtwork from "@/components/SongArtwork";
import SongInfo from "@/components/SongInfo";
import SongSlider from "@/components/SongSlider";
import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from "react-native-track-player";

export default function index() {
  const [track, settrack] = useState<Track | null>();
  const [imageColors, setimageColors] = useState<ImageColorsResult>();
  const [bgColor, setbgColor] = useState<string>("#000");

  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.MetadataCommonReceived],
    async (event) => {
      switch (event.type) {
        case Event.PlaybackActiveTrackChanged:
          const playingTrack = await TrackPlayer.getActiveTrack();
          settrack(playingTrack);
          break;
      }
    },
  );

  const getInitialTrack = async () => {
    const playingTrack = await TrackPlayer.getActiveTrack();
    settrack(playingTrack);
  };

  useEffect(() => {
    getInitialTrack();
  }, []);

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

  useEffect(() => {
    imageColors
      ? imageColors.platform === "ios"
        ? setbgColor(imageColors.background)
        : setbgColor(imageColors.dominant)
      : setbgColor("#000");
  }, [imageColors]);

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
      <Stack.Screen
        options={{ navigationBarColor: bgColor, presentation: "modal" }}
      />
    </View>
  );
}
