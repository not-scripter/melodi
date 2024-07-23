import ScrollView from "@/components/ScrollView";
import React from "react";
import { List } from "react-native-paper";

export default function Info() {
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>SOCIALS</List.Subheader>
        <List.Item title="Github" description="View the source code" />
      </List.Section>
      <List.Section>
        <List.Subheader>TROUBLESOOTING</List.Subheader>
        <List.Item
          title="Report an issue"
          description="You will be redirected to github"
        />
      </List.Section>
    </ScrollView>
  );
}
