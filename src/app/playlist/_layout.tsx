import { View, Text } from "react-native";
import React from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Slot } from "expo-router";

export default function _layout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
