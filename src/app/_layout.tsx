import { Stack } from "expo-router/stack";
import { PaperProvider, useTheme } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import TrackPlayer from "react-native-track-player";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addTrack, playbackService, setupPlayer } from "rntp-service";

export default function Layout() {
  const theme = useTheme();

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
    <PaperProvider
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
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
