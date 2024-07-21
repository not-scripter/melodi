import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { lightBlue50 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Slider } from "@miblanchard/react-native-slider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type FloatingPlayerProps = {
  track: Track | undefined;
};

export default function FloatingPlayer({ track }: FloatingPlayerProps) {
  const { artworkColors } = useSelector((state: RootState) => state.track);

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

  const { position, duration } = useProgress();
  const { width } = Dimensions.get("screen");

  if (track) {
    return (
      <>
        <Slider
          disabled
          thumbStyle={{ opacity: 0 }}
          containerStyle={{
            flex: 1,
            justifyContent: "flex-start",
            position: "absolute",
            width: "100%",
            height: 2,
          }}
          trackStyle={{ height: 2 }}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          maximumTrackTintColor={artworkColors.average}
          minimumTrackTintColor={artworkColors.lightMuted}
          animateTransitions={true}
        />
        <View className="relative w-full h-full flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center">
            <Image
              source={{ uri: track?.artwork }}
              className="h-12 w-12 rounded-md"
            />
            <Text
              className="tracking-wide font-bold ml-2"
              style={{ color: artworkColors.lightMuted }}
            >
              {track?.title}
            </Text>
          </View>
          <View className="flex-row ">
            <IconButton
              icon="play-skip-back"
              onPress={skipToPrevious}
              iconColor={artworkColors.lightMuted}
              className="m-0"
            />
            <IconButton
              icon={playbackState.state === State.Playing ? "pause" : "play"}
              onPress={() => togglePlayback(playbackState.state)}
              iconColor={artworkColors.lightMuted}
              className="m-0"
            />
            <IconButton
              icon="play-skip-forward"
              onPress={skipToNext}
              iconColor={artworkColors.lightMuted}
              className="m-0"
            />
          </View>
        </View>
      </>
    );
  }

  return (
    <View>
      <Text>No track</Text>
    </View>
  );
}
