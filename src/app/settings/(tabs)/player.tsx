import ScrollView from "@/components/ScrollView";
import React, { useState } from "react";
import { List, Switch } from "react-native-paper";

export default function Player() {
  const [resumePlayback, setresumePlayback] = useState<boolean>(false);
  const toggleResumePlayback = () => setresumePlayback((prev) => !prev);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>PLAYER</List.Subheader>
        <List.Item
          title="Resume Playback"
          description="When a wired or bluetooth device is connected"
          right={() => (
            <Switch value={resumePlayback} onChange={toggleResumePlayback} />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>AUDIO</List.Subheader>
        <List.Item
          title="Equalizer"
          description="Interact with the system equalizer"
        />
      </List.Section>
    </ScrollView>
  );
}
