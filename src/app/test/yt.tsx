import { View, Text } from "react-native";
import React from "react";
import youtubeDl from "youtube-dl-exec";

export default function yt() {
  // youtubeDl("https://www.youtube.com/watch?v=6xKWiCMKKJg", {
  //   dumpSingleJson: true,
  //   noCheckCertificates: true,
  //   noWarnings: true,
  //   preferFreeFormats: true,
  //   addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  // }).then((output) => console.log(output));

  return (
    <View>
      <Text>yt</Text>
    </View>
  );
}
