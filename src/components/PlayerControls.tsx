import React from "react";
import { View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";

export default function PlayerControls() {
  const { colors } = useAppTheme();

  const { playing, bufferingDuringPlay } = useIsPlaying();
  const togglePlayback = async () => {
    if (!playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const handleFavourite = async () => {};
  const handleLoop = async () => {};

  return (
    <View className="flex-row w-full items-center justify-evenly">
      <IconButton
        icon="heart"
        onPress={handleFavourite}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
      />
      <IconButton
        icon="play-skip-back"
        onPress={skipToPrevious}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
      />
      {bufferingDuringPlay === true ? (
        <ActivityIndicator size={48} style={{ padding: 14 }} />
      ) : (
        <IconButton
          icon={playing ? "pause" : "play"}
          onPress={() => togglePlayback()}
          size={48}
          iconColor={colors.secondary}
          containerColor={colors.backdrop}
        />
      )}
      <IconButton
        icon="play-skip-forward"
        onPress={skipToNext}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
      />
      <IconButton
        icon="infinite"
        onPress={handleLoop}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
      />
    </View>
  );
}
