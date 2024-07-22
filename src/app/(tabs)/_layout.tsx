import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import QuickPicks from "./quick-picks";
import Songs from "./songs";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import Playlists from "./playlists";
import Artists from "./artists";
import Albums from "./albums";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Content title="Melodi" />
        <Appbar.Action
          onPress={() => {
            router.navigate("/settings");
          }}
          icon="settings"
        />
        <Appbar.Action
          onPress={() => {
            router.navigate("/settings/appearance");
          }}
          icon="settings"
        />
      </Appbar.Header>
      <Tab.Navigator>
        <Tab.Screen name="quick-picks" component={QuickPicks} options={{}} />
        <Tab.Screen name="songs" component={Songs} />
        <Tab.Screen name="playlists" component={Playlists} />
        <Tab.Screen name="artists" component={Artists} />
        <Tab.Screen name="albums" component={Albums} />
      </Tab.Navigator>
    </>
  );
}
