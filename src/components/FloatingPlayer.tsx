import React from "react";
import { Image, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type FloatingPlayerProps = {
  track: Track | undefined;
};

export default function FloatingPlayer({ track }: FloatingPlayerProps) {
  const theme = useAppTheme();

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

  if (track) {
    return (
      <View className="w-full h-full flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center">
          <Image
            source={{ uri: track?.artwork }}
            className="h-12 w-12 rounded-md"
          />
          <Text
            className="text-lg font-bold ml-2"
            style={{ color: theme.colors.primary }}
          >
            {track?.title}
          </Text>
        </View>
        <View className="flex-row ">
          <IconButton
            icon="play-skip-back"
            onPress={skipToPrevious}
            iconColor={theme.colors.primary}
            className="m-0"
          />
          <IconButton
            icon={playbackState.state === State.Playing ? "pause" : "play"}
            onPress={() => togglePlayback(playbackState.state)}
            iconColor={theme.colors.primary}
            className="m-0"
          />
          <IconButton
            icon="play-skip-forward"
            onPress={skipToNext}
            iconColor={theme.colors.primary}
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
