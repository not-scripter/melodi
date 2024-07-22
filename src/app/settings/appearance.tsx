import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button, Dialog, List, Portal } from "react-native-paper";

export default function Appearance() {
  const [isThemeVisible, setisThemeVisible] = useState(false);
  const showThemeDialog = () => setisThemeVisible(true);
  const hideThemeDialog = () => setisThemeVisible(false);
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Colors</List.Subheader>
        <List.Item title="Theme" onPress={showThemeDialog} />

        <Portal>
          <Dialog visible={isThemeVisible} onDismiss={hideThemeDialog}>
            <Dialog.Actions>
              <Button onPress={() => console.log("Cancel")}>Cancel</Button>
              <Button onPress={() => console.log("Ok")}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>
    </ScrollView>
  );
}
