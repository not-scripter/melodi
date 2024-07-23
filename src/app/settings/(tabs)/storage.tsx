import { View, Text } from "react-native";
import React, { useState } from "react";
import ScrollView from "@/components/ScrollView";
import { Button, Dialog, List, Portal, RadioButton } from "react-native-paper";

type ImageCacheProps = "128mb" | "256mb";
type SongCacheProps = "512mb" | "1gb";

export default function Storage() {
  const [imageCache, setimageCache] = useState<ImageCacheProps>();
  const [isImageCacheDialogVisible, setisImageCacheDialogVisible] =
    useState(false);
  const showImageCacheDialog = () => setisImageCacheDialogVisible(true);
  const hideImageCacheDialog = () => setisImageCacheDialogVisible(false);

  const [songCache, setsongCache] = useState<SongCacheProps>();
  const [isSongCacheDialogVisible, setisSongCacheDialogVisible] =
    useState(false);
  const showSongCacheDialog = () => setisSongCacheDialogVisible(true);
  const hideSongCacheDialog = () => setisSongCacheDialogVisible(false);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>IMAGE CACHE</List.Subheader>
        <List.Item title="Max Size" onPress={showImageCacheDialog} />
        <Portal>
          <Dialog
            visible={isImageCacheDialogVisible}
            onDismiss={hideImageCacheDialog}
          >
            <Dialog.Title>Max Cache</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Item
                label="128MB"
                value="128mb"
                status={imageCache === "128mb" ? "checked" : "unchecked"}
                onPress={() => setimageCache("128mb")}
              />
              <RadioButton.Item
                label="256MB"
                value="256mb"
                status={imageCache === "256mb" ? "checked" : "unchecked"}
                onPress={() => setimageCache("256mb")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideImageCacheDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>SONG CACHE</List.Subheader>
        <List.Item title="Max Size" onPress={showSongCacheDialog} />
        <Portal>
          <Dialog
            visible={isSongCacheDialogVisible}
            onDismiss={hideSongCacheDialog}
          >
            <Dialog.Title>Max Cache</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Item
                label="512MB"
                value="512mb"
                status={songCache === "512mb" ? "checked" : "unchecked"}
                onPress={() => setsongCache("512mb")}
              />
              <RadioButton.Item
                label="1GB"
                value="1gb"
                status={songCache === "1gb" ? "checked" : "unchecked"}
                onPress={() => setsongCache("1gb")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideSongCacheDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>BACKUP</List.Subheader>
        <List.Item
          title="Backup"
          description="Export the data to external storage"
        />
      </List.Section>

      <List.Section>
        <List.Subheader>RESTORE</List.Subheader>
        <List.Item
          title="Restore"
          description="Backup the database from external storage"
        />
      </List.Section>

      <List.Section>
        <List.Subheader>RESET</List.Subheader>
        <List.Item title="Reset all" description="Delete all app data" />
      </List.Section>
    </ScrollView>
  );
}
