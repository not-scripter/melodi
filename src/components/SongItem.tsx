import { View, Text, Image } from "react-native";
import React from "react";
import { playlistData } from "@/constants";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { Track } from "react-native-track-player";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type SongItemsProps = {
  track: Track | undefined;
};

export default function SongItem({ track }: SongItemsProps) {
  const { artworkColors } = useSelector((state: RootState) => state.track);

  return (
    <View className="flex-row items-center px-2 py-2">
      <Image
        source={{ uri: track?.artwork }}
        className="h-14 w-14 rounded-md"
      />
      <View className="ml-2 flex-1">
        <Text
          className="tracking-wide font-bold"
          style={{ color: artworkColors.lightMuted }}
        >
          {track?.title}
        </Text>
        <View className="flex-row justify-between mt-2">
          <Text
            className="text-xs font-bold"
            style={{ color: artworkColors.lightMuted }}
          >
            {track?.artist}
          </Text>
          <Text
            className="text-xs font-bold"
            style={{ color: artworkColors.lightMuted }}
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
