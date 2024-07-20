import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { playlistData } from "@/constants";
import SongItem from "@/components/SongItem";
import Stack from "expo-router/stack";

export default function index() {
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
