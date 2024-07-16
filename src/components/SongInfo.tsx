import { View, Pressable, Image } from "react-native";
import React, { PropsWithChildren } from "react";
import { Track } from "react-native-track-player";
import { Text, useTheme } from "react-native-paper";

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongInfo({ track }: SongInfoProps) {
  const theme = useTheme();

  return (
    <View>
      <Text
        style={{ color: theme.colors.onPrimary }}
        className="font-bold text-xl text-center mb-6"
      >
        {track?.title}
      </Text>
    </View>
  );
}
