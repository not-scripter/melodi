import ScrollView from "@/components/ScrollView";
import React from "react";
import { List } from "react-native-paper";

export default function Others() {
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>SERVICES</List.Subheader>
        <List.Item
          title="Ignore Battery Optimizations"
          description="Disable background restrictions"
        />
      </List.Section>
    </ScrollView>
  );
}
