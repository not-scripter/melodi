import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Track } from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongInfo({ track }: SongInfoProps) {
  const { artworkColors } = useSelector((state: RootState) => state.track);

  return (
    <View>
      <Text
        style={{ color: artworkColors.lightMuted }}
        className="font-bold text-xl tracking-wide text-center mb-6"
      >
        {track?.title}
      </Text>
    </View>
  );
}
