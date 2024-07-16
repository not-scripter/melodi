import { View, Text } from "react-native";
import React, { useState } from "react";
import { useProgress } from "react-native-track-player";
import Slider from "@react-native-community/slider";
import { seekTo } from "react-native-track-player/lib/src/trackPlayer";
import { useTheme } from "react-native-paper";
import { getColors } from "react-native-image-colors";

export default function SongSlider() {
  const theme = useTheme();
  const { position, buffered, duration } = useProgress();
  console.log("buffered", buffered);

  const [artColors, setartColors] = useState();

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
      <View className="flex-row w-full justify-between px-2">
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
