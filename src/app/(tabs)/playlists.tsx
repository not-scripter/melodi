import React from "react";
import { Text, View } from "react-native";
import ytdl from "ytdl-native";

export default function Playlists() {
  async function test() {
    const youtubeURL = "https://music.youtube.com/watch?v=i8VAQ8Cy5rs";
    const audio = await ytdl(youtubeURL, { filter: "audioonly" });
    console.log(audio[0]);
  }
  test();

  return (
    <View>
      <Text>Playlists</Text>
    </View>
  );
}
