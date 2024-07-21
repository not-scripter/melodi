import {
  Material3ThemeProvider,
  useAppTheme,
} from "@/components/providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Stack } from "expo-router";
import { RootState, store } from "@/app/store";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ImageColors from "react-native-image-colors";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import TrackPlayer, { Track, useActiveTrack } from "react-native-track-player";
import { Provider, useSelector } from "react-redux";
import { addTrack, playbackService, setupPlayer } from "rntp-service";
import Player from "@/components/Player";

export default function Layout() {
  const theme = useAppTheme();

  // const insets = useSafeAreaInsets();
  // console.log(insets);

  const [isPlayerReady, setisPlayerReady] = useState<boolean>();

  const [imageColors, setimageColors] = useState<ImageColorsResult>();
  const bgColor = imageColors
    ? imageColors.platform === "ios"
      ? imageColors.background
      : imageColors.dominant
    : "#000";

  const track: Track | undefined = useActiveTrack();

  const getImageColors = async () => {
    const response =
      track?.artwork && (await ImageColors.getColors(track?.artwork));
    if (response) {
      setimageColors(response);
    }
  };

  useEffect(() => {
    getImageColors();
  }, [track]);

  // if (!isPlayerReady) {
  //   <View>
  //     <Text>Loading...</Text>
  //   </View>;
  // }

  return (
    <Provider store={store}>
      <Material3ThemeProvider
        settings={{
          icon: (props: any) => <Ionicons {...props} />,
        }}
      >
        <GestureHandlerRootView
          style={{ backgroundColor: theme.colors.onBackground }}
          className="h-full"
        >
          <Stack
            screenOptions={{
              gestureEnabled: true,
              animation: "slide_from_bottom",
              headerStyle: {
                backgroundColor: theme.colors.onBackground,
              },
              headerTintColor: theme.colors.onPrimary,
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
              headerShown: false,
            }}
          >
            {/* <Stack.Screen name="index" /> */}
          </Stack>
          <Player />
        </GestureHandlerRootView>
      </Material3ThemeProvider>
    </Provider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
