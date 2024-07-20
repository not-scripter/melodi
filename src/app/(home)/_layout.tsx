import { View, Text } from "react-native";
import React from "react";
import { router, Slot } from "expo-router";
import { Appbar } from "react-native-paper";
import TrackPlayer from "react-native-track-player";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import SideNav from "@/components/SideNav";
import Stack from "expo-router/stack";

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

export default function _layout() {
  const theme = useAppTheme();
  return (
    <View
      className="relative h-full"
      style={{ backgroundColor: theme.colors.background }}
    >
      <View className="flex-row">
        <SideNav data={navItems} ListHeaderComponent={RootSideHeader} />
        <Slot />
        {/* <Stack.Screen /> */}
      </View>
    </View>
  );
}

export const RootSideHeader = () => {
  return (
    <Appbar.Header mode="large">
      <Appbar.Action
        onPress={() => {
          router.navigate("/settings");
        }}
        icon="settings"
      />
    </Appbar.Header>
  );
};
// <Appbar.Header mode="large">
//   <Appbar.Content title="Home" />
//   <Appbar.Action
//     onPress={() => {
//       TrackPlayer.reset();
//     }}
//     icon="close"
//   />
//   <Appbar.Action
//     onPress={() => {
//       router.navigate("/test/align");
//     }}
//     icon="airplane"
//   />
// </Appbar.Header>
