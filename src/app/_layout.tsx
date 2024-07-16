import { Stack } from "expo-router/stack";
import { PaperProvider, useTheme } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import TrackPlayer from "react-native-track-player";
import { View } from "react-native";

export default function Layout() {
  const theme = useTheme();
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
        ></Stack>
        <Stack.Screen options={{}} />
      </View>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => require("rntp-service"));
