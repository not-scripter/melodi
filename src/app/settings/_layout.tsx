import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { router, Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

export default function SettingsLayout() {
  const { colors } = useAppTheme();
  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Action
          onPress={() => {
            router.back();
          }}
          icon="arrow-back"
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View
        className="relative h-full"
        style={{ backgroundColor: colors.background }}
      >
        <Slot />
      </View>
    </>
  );
}
