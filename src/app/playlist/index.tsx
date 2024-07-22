import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { playlistData } from "@/constants";
import SongItem from "@/components/SongItem";
import Stack from "expo-router/stack";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function index() {
  const { colors } = useTheme();
  console.log("Mytheme colors", colors);

  return (
    <>
      <FlatList
        data={playlistData}
        renderItem={({ item }) => (
          <Pressable>
            <SongItem track={item} />
          </Pressable>
        )}
        keyExtractor={(track) => track.id}
      />
      <Stack.Screen options={{ gestureEnabled: true, presentation: "modal" }} />
    </>
  );
}
