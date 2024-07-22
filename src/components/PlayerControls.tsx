import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function PlayerControls() {
  const { artworkColors } = useSelector((state: RootState) => state.track);
  const { colors } = useAppTheme();

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
  const handleFavourite = async () => {};
  const handleLoop = async () => {};

  return (
    <View className="flex-row w-full items-center justify-evenly">
      <IconButton
        icon="heart"
        onPress={handleFavourite}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
        mode="contained"
      />
      <IconButton
        icon="play-skip-back"
        onPress={skipToPrevious}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
        mode="contained"
      />
      <IconButton
        icon={playbackState.state === State.Playing ? "pause" : "play"}
        onPress={() => togglePlayback(playbackState.state)}
        size={48}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
        mode="contained"
      />
      <IconButton
        icon="play-skip-forward"
        onPress={skipToNext}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
        mode="contained"
      />
      <IconButton
        icon="infinite"
        onPress={handleLoop}
        iconColor={colors.secondary}
        containerColor={colors.backdrop}
        mode="contained"
      />
    </View>
  );
}
