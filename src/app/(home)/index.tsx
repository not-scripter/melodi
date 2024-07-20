import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { Link, router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Button, Divider } from "react-native-paper";
import FloatingPlayer from "@/components/FloatingPlayer";
import Player from "@/components/Player";
import SongItem from "@/components/SongItem";
import { playlistData } from "@/constants";
import SongInfo from "@/components/SongInfo";
import TrackPlayer, {
  Event,
  RepeatMode,
  Track,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import AvatarText from "react-native-paper/lib/typescript/components/Avatar/AvatarText";
import SideNav from "@/components/SideNav";

export default function index() {
  const theme = useAppTheme();

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

  const navItems = [
    {
      label: "Home",
      icon: "home",
      href: "/",
    },
    {
      label: "Playlist",
      icon: "list",
      href: "/playlist",
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={HomeHeader}
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
      <Appbar.Action
        onPress={() => {
          TrackPlayer.reset();
        }}
        icon="close"
      />
      <Appbar.Action
        onPress={() => {
          router.navigate("/test/align");
        }}
        icon="airplane"
      />
    </Appbar.Header>
  );
};