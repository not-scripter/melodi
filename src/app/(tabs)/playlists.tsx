import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Playlists() {
  return (
    <View>
      <Link href="test">
        <Button mode="elevated">Test</Button>
      </Link>
      <View>{}</View>
    </View>
  );
}
