import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import SideNav from "@/components/SideNav";
import { router, Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

export default function HomeLayout() {
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
        <Appbar.Action
          onPress={() => {
            router.navigate("/settings/appearance");
          }}
          icon="settings"
        />
      </Appbar.Header>
      <View
        className="relative h-full"
        style={{ backgroundColor: colors.background }}
      >
        <View className="flex-row">
          <Slot />
          {/* <Stack.Screen /> */}
        </View>
      </View>
    </>
  );
}
