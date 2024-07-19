import { View, Text, Image } from "react-native";
import React from "react";
import { playlistData } from "@/constants";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { Track } from "react-native-track-player";

type SongItemsProps = {
  track: Track | undefined;
};

export default function SongItem({ track }: SongItemsProps) {
  const theme = useAppTheme();
  // const track = playlistData[2];

  if (!track) {
    <View>
      <Text>Track Not Found</Text>
    </View>;
  }

  return (
    <View className="flex-row items-center p-4">
      <Image
        source={{ uri: track?.artwork }}
        className="h-12 w-12 rounded-md"
      />
      <View className="ml-2 flex-1">
        <Text
          className="text-lg font-bold"
          style={{ color: theme.colors.onPrimary }}
        >
          {track?.title}
        </Text>
        <View className="flex-row justify-between">
          <Text
            className="text-sm font-bold"
            style={{ color: theme.colors.surface }}
          >
            {track?.artist}
          </Text>
          <Text
            className="text-sm font-bold"
            style={{ color: theme.colors.surface }}
          >
            {Math.floor(track?.duration / 60)
              .toString()
              .padStart(2, "0")}
            :{(track?.duration % 60).toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
    </View>
  );
}
