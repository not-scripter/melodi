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
import * as Linking from "expo-linking";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  Linking.addEventListener("url", ({ url }) => {
    if (url === "trackplayer://notification.click") {
      router.push("settings");
    }
  });

  // const insets = useSafeAreaInsets();
  // console.log(insets);

  // if (!isPlayerReady) {
  //   <View>
  //     <Text>Loading...</Text>
  //   </View>;
  // }

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Material3ThemeProvider
          settings={{
            icon: (props: any) => <Ionicons {...props} />,
          }}
        >
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                gestureEnabled: true,
                animation: "ios",
                headerShown: false,
              }}
              initialRouteName="(tabs)"
            />
            <Player />
          </GestureHandlerRootView>
        </Material3ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
