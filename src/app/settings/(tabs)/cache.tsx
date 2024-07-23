import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import ScrollView from "@/components/ScrollView";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  List,
  Portal,
  RadioButton,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";

type ImageCacheProps = "128mb" | "256mb";
type SongCacheProps = "512mb" | "1gb";

export default function Cache() {
  const { colors } = useAppTheme();

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
        <List.Subheader>Image Cache</List.Subheader>
        <List.Item title="Max Size" onPress={showImageCacheDialog} />

        <List.Subheader>Song Cache</List.Subheader>
        <List.Item title="Max Size" onPress={showSongCacheDialog} />

        <Portal>
          <Dialog
            visible={isImageCacheDialogVisible}
            onDismiss={hideImageCacheDialog}
          >
            <Dialog.Title>Theme</Dialog.Title>
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
    </ScrollView>
  );
}
