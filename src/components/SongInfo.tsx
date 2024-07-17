import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Track } from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongInfo({ track }: SongInfoProps) {
  const theme = useAppTheme();

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
