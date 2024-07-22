import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import QuickPicks from "./quickPicks";
import Songs from "./songs";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import Playlists from "./playlists";
import Artists from "./artists";
import Albums from "./albums";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import IonIcons from "@expo/vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const { colors } = useAppTheme();
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
      <Tab.Navigator
        initialRouteName="quick-picks"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
          },
          tabBarItemStyle: { borderRadius: 50 },
          tabBarLabelStyle: { fontSize: 8 },
          tabBarIconStyle: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarActiveTintColor: colors.secondary,
        }}
      >
        <Tab.Screen
          name="quick-picks"
          component={QuickPicks}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="songs"
          component={Songs}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons size={24} color={color} name="musical-notes" />
            ),
          }}
        />
        <Tab.Screen
          name="playlists"
          component={Playlists}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons size={24} color={color} name="library" />
            ),
          }}
        />
        <Tab.Screen
          name="artists"
          component={Artists}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons size={24} color={color} name="person" />
            ),
          }}
        />
        <Tab.Screen
          name="albums"
          component={Albums}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons size={24} color={color} name="albums" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
