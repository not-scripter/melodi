import {
  Material3ThemeProvider,
  useAppTheme,
} from "@/components/providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import { addTrack, playbackService, setupPlayer } from "rntp-service";

export default function Layout() {
  const theme = useAppTheme();

  const [isPlayerReady, setisPlayerReady] = useState(false);

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
    <GestureHandlerRootView>
      <Material3ThemeProvider
        settings={{
          icon: (props: any) => <Ionicons {...props} />,
        }}
      >
        <View
          style={{ backgroundColor: theme.colors.onBackground }}
          className="h-full"
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
              navigationBarColor: theme.colors.onBackground,
            }}
          />
          {/* <Stack.Screen options={{ presentation: "modal" }} /> */}
        </View>
      </Material3ThemeProvider>
    </GestureHandlerRootView>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
