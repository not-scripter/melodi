import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
// import youtubeDl from "youtube-dl-exec";

export default function Playlists() {
  const [console, setconsole] = useState<any>();
  async function test() {
    //   try {
    //     youtubeDl("https://www.youtube.com/watch?v=6xKWiCMKKJg", {
    //       dumpSingleJson: true,
    //       noCheckCertificates: true,
    //       noWarnings: true,
    //       preferFreeFormats: true,
    //       addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    //     })
    //       .then((output) => setconsole(output))
    //       .catch((error) => console.log(error));
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  return (
    <View>
      <Button mode="elevated" onPress={test}>
        Play
      </Button>
      <View>{console}</View>
    </View>
  );
}
