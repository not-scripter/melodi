import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import ScrollView from "@/components/ScrollView";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  List,
  Portal,
  RadioButton,
  Switch,
} from "react-native-paper";

type ThemeProps = "system" | "dynamic" | "pureBlack";

export default function Appearance() {
  const [theme, settheme] = useState<ThemeProps>();
  const [isThemeDialogVisible, setisThemeDialogVisible] = useState(false);
  const showThemeDialog = () => setisThemeDialogVisible(true);
  const hideThemeDialog = () => setisThemeDialogVisible(false);

  const [isSystemFontEnabled, setisSystemFontEnabled] = useState(false);
  const toggleIsSystemFontEnabled = () =>
    setisSystemFontEnabled((prev) => !prev);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>COLORS</List.Subheader>
        <List.Item title="Theme" onPress={showThemeDialog} />

        <Portal>
          <Dialog visible={isThemeDialogVisible} onDismiss={hideThemeDialog}>
            <Dialog.Title>Theme</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Item
                label="System"
                value="system"
                status={theme === "system" ? "checked" : "unchecked"}
                onPress={() => settheme("system")}
              />
              <RadioButton.Item
                label="Dynamic"
                value="dynamic"
                status={theme === "dynamic" ? "checked" : "unchecked"}
                onPress={() => settheme("dynamic")}
              />
              <RadioButton.Item
                label="Pure Black"
                value="pureBlack"
                status={theme === "pureBlack" ? "checked" : "unchecked"}
                onPress={() => settheme("pureBlack")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideThemeDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>TYPOGRAPHY</List.Subheader>
        <List.Item
          title="Use System Font"
          right={() => (
            <Switch
              value={isSystemFontEnabled}
              onChange={toggleIsSystemFontEnabled}
            />
          )}
        />
      </List.Section>
    </ScrollView>
  );
}
