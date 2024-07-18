import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TrackPlayer, {
  State,
  Track,
  useActiveTrack,
  usePlaybackState,
} from "react-native-track-player";
import { Link } from "expo-router";
import { IconButton } from "react-native-paper";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";

export default function FloatingPlayer() {
  const theme = useAppTheme();
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

  const playbackState = usePlaybackState();

  const togglePlayback = async (playbackState: State | undefined) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const setFavourite = async () => {};
  const setShuffle = async () => {};

  if (track) {
    return (
      <View
        className="w-full absolute bottom-0 flex-row items-center justify-between px-4 py-2"
        style={{ backgroundColor: bgColor }}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: track?.artwork }}
            className="h-12 w-12 rounded-md"
          />
          <Text
            className="text-lg font-bold ml-2"
            style={{ color: theme.colors.onPrimary }}
          >
            {track?.title}
          </Text>
        </View>
        <View className="flex-row ">
          <IconButton
            icon="play-skip-back"
            onPress={skipToPrevious}
            iconColor={theme.colors.onPrimary}
            className="m-0"
          />
          <IconButton
            icon={playbackState.state === State.Playing ? "pause" : "play"}
            onPress={() => togglePlayback(playbackState.state)}
            iconColor={theme.colors.onPrimary}
            className="m-0"
          />
          <IconButton
            icon="play-skip-forward"
            onPress={skipToNext}
            iconColor={theme.colors.onPrimary}
            className="m-0"
          />
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>No track</Text>
    </View>
  );
}
