import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import SongItem from "@/components/SongItem";
import { playlistData } from "@/constants";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from "react-native-track-player";

export default function index() {
  const getmusic = async () => {
    // const res = await getYtMusic("qnQCd_nZn_g");
    // console.log(res);
    // const music = await ytdl.getBasicInfo(
    //   "https://music.youtube.com/watch?v=i8VAQ8Cy5rs",
    // );
    //
    // console.log(music);
  };

  const [activestate, setactivestate] = useState<number>();

  useTrackPlayerEvents(
    [Event.MetadataCommonReceived, Event.PlaybackActiveTrackChanged],
    async () => {
      const res = await TrackPlayer.getActiveTrackIndex();
      setactivestate(res);
    },
  );

  const handlePlay = async (track: Track) => {
    await TrackPlayer.add(track, activestate);
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  };

  return (
    <FlatList
      data={playlistData}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePlay(item)}>
          <SongItem track={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={Divider}
      keyExtractor={(track) => track.id}
    />
  );
}

export const HomeHeader = () => {
  return (
    <Appbar.Header mode="large">
      <Appbar.Content title="Home" />
    </Appbar.Header>
  );
};
