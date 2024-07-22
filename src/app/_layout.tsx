import { Material3ThemeProvider } from "@/components/providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { persistor, store } from "@/app/store";
import Player from "@/components/Player";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { playbackService } from "rntp-service";

export default function RootLayout() {
  // const insets = useSafeAreaInsets();
  // console.log(insets);

  // if (!isPlayerReady) {
  //   <View>
  //     <Text>Loading...</Text>
  //   </View>;
  // }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Material3ThemeProvider
          settings={{
            icon: (props: any) => <Ionicons {...props} />,
          }}
        >
          <GestureHandlerRootView className="h-full">
            <Stack
              screenOptions={{
                gestureEnabled: true,
                animation: "ios",
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
            </Stack>
            <Player />
          </GestureHandlerRootView>
        </Material3ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
