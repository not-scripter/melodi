import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import TrackPlayer from "react-native-track-player";

export default function Playlists() {
  async function test() {}
  test();

  return (
    <View>
      <Button mode="elevated" onPress={() => TrackPlayer.play()}>
        Play
      </Button>
    </View>
  );
}
