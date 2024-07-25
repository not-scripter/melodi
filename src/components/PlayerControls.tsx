import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import TrackPlayer, {
  RepeatMode,
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { addFavMusic, addFavMusics } from "@/features/slices/favSlice";

export default function PlayerControls() {
  const dispatch = useDispatch();
  const { colors } = useAppTheme();
  const { musics } = useSelector((state: RootState) => state.favourites);
  // const { activeTrack } = useSelector((state: RootState) => state.track);
  const track = useActiveTrack();

  const [isFab, setisFab] = useState<boolean>();
  // musics.find((item) => item === track) !== undefined,
  const [isLooped, setisLooped] = useState(false);

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
  const handleFav = async () => {
    console.log(musics);
    setisFab((prev) => !prev);
  };
  const handleLoop = async () => {
    setisLooped((prev) => !prev);
    // TrackPlayer.setRepeatMode("Off");
  };

  useEffect(() => {
    dispatch(addFavMusic(track));
  }, [isFab]);

  return (
    <View className="flex-row w-full items-center justify-evenly">
      <IconButton
        icon="heart"
        onPress={handleFav}
        iconColor={isFab ? colors.tertiary : colors.outline}
      />
      <IconButton
        icon="play-skip-back"
        onPress={skipToPrevious}
        iconColor={colors.secondary}
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
      />
      <IconButton
        icon="infinite"
        onPress={handleLoop}
        iconColor={isLooped ? colors.tertiary : colors.outline}
      />
    </View>
  );
}
