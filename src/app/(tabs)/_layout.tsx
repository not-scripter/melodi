import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Explore from ".";
import Songs from "./songs";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import Playlists from "./playlists";
import Artists from "./artists";
import Albums from "./albums";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import IonIcons from "@expo/vector-icons/Ionicons";
import { TabBar } from "@/components/TabBar";

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
      </Appbar.Header>
      <Tab.Navigator tabBar={TabBar}>
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{ tabBarIcon: "home" }}
        />
        <Tab.Screen
          name="Songs"
          component={Songs}
          options={{ tabBarIcon: "musical-notes" }}
        />
        <Tab.Screen
          name="Playlists"
          component={Playlists}
          options={{ tabBarIcon: "library" }}
        />
        <Tab.Screen
          name="Artists"
          component={Artists}
          options={{ tabBarIcon: "person" }}
        />
        <Tab.Screen
          name="Albums"
          component={Albums}
          options={{ tabBarIcon: "albums" }}
        />
      </Tab.Navigator>
    </>
  );
}
