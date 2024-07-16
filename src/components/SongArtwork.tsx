import { View, Pressable, Image } from "react-native";
import React, { PropsWithChildren, useState } from "react";
import { Track } from "react-native-track-player";
import { Text, useTheme } from "react-native-paper";
import { getColors } from "react-native-image-colors";

type SongArtwordProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongArtwork({ track }: SongArtwordProps) {
  const theme = useTheme();

  const [isInfoVisible, setisInfoVisible] = useState<boolean>(false);

  const [artColors, setartColors] = useState();

  // getColors(track?.artwork).then((res) => setartColors(res));
  // console.log(artColors);
  React.useEffect(() => {
    const url = "https://i.imgur.com/68jyjZT.jpg";

    getColors(url, {
      fallback: "#228B22",
      cache: true,
      key: url,
    }).then((res) => console.log(res));
  }, []);

  return (
    <View
      className="w-[85vw] h-[85vw] overflow-hidden relative"
      style={{ borderRadius: theme.roundness }}
    >
      <Pressable onLongPress={() => setisInfoVisible(!isInfoVisible)}>
        <Image source={{ uri: track?.artwork }} className="w-full h-full" />
        {isInfoVisible && (
          <View className="absolute w-full h-full bg-black/50 flex-1 items-center justify-center">
            <View>
              <Text
                style={{ color: theme.colors.onPrimary }}
                className="text-lg font-bold"
              >
                Title: {track?.title}
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: theme.colors.onPrimary }}
              >
                Artist: {track?.artist}
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: theme.colors.onPrimary }}
              >
                Type: {track?.type}
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: theme.colors.onPrimary }}
              >
                Genre: {track?.genre}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}
