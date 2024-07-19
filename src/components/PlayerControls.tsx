import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";

export default function PlayerControls() {
  const theme = useAppTheme();

  const playbackState = usePlaybackState();

  const togglePlayback = async (playbackState: State | undefined) => {
    const activeTrack = await TrackPlayer.getActiveTrackIndex();

    if (activeTrack !== null) {
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

  return (
    <View className="flex-row w-full items-center justify-evenly">
      <IconButton
        icon="heart"
        onPress={setFavourite}
        iconColor={theme.colors.onPrimary}
        mode="contained"
        containerColor={theme.colors.backdrop}
      />
      <IconButton
        icon="play-skip-back"
        onPress={skipToPrevious}
        iconColor={theme.colors.onPrimary}
        mode="contained"
        containerColor={theme.colors.backdrop}
      />
      <IconButton
        icon={playbackState.state === State.Playing ? "pause" : "play"}
        onPress={() => togglePlayback(playbackState.state)}
        size={48}
        iconColor={theme.colors.onPrimary}
        mode="contained"
        containerColor={theme.colors.backdrop}
      />
      <IconButton
        icon="play-skip-forward"
        onPress={skipToNext}
        iconColor={theme.colors.onPrimary}
        mode="contained"
        containerColor={theme.colors.backdrop}
      />
      <IconButton
        icon="shuffle"
        onPress={setShuffle}
        iconColor={theme.colors.onPrimary}
        mode="contained"
        containerColor={theme.colors.backdrop}
      />
    </View>
  );
}
