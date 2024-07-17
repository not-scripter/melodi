import Slider from "@react-native-community/slider";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useProgress } from "react-native-track-player";
import { seekTo } from "react-native-track-player/lib/src/trackPlayer";

export default function SongSlider() {
  const theme = useTheme();
  const { position, duration } = useProgress();

  return (
    <View className="w-full">
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={theme.colors.onPrimary}
        maximumTrackTintColor={theme.colors.onPrimary}
        onValueChange={(value) => seekTo(value)}
      />
      <View className="flex-row w-full justify-between px-3">
        <Text className=" font-bold" style={{ color: theme.colors.onPrimary }}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text className=" font-bold" style={{ color: theme.colors.onPrimary }}>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
}
