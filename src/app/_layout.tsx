import {
  Material3ThemeProvider,
  useAppTheme,
} from "@/components/providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Stack } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, { Track, useActiveTrack } from "react-native-track-player";
import { addTrack, playbackService, setupPlayer } from "rntp-service";

export default function Layout() {
  const theme = useAppTheme();

  const insets = useSafeAreaInsets();
  console.log(insets);

  const [isPlayerReady, setisPlayerReady] = useState(false);

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

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setisPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    <View>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: theme.colors.onBackground }}
      className="h-full"
    >
      <Material3ThemeProvider
        settings={{
          icon: (props: any) => <Ionicons {...props} />,
        }}
      >
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.onBackground,
            },
            headerTintColor: theme.colors.onPrimary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            navigationBarColor: "#FFFFFF00",
          }}
        >
          <Stack.Screen
            name="player/index"
            options={{
              presentation: "card",
              gestureEnabled: true,
              gestureDirection: "horizontal",
              animation: "slide_from_bottom",
              animationDuration: 2000,
              headerShown: false,
            }}
          />
        </Stack>
        {/* <Stack.Screen options={{ presentation: "modal" }} /> */}
      </Material3ThemeProvider>
    </GestureHandlerRootView>
  );
}
// navigationBarColor: track ? bgColor : theme.colors.onBackground,

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
