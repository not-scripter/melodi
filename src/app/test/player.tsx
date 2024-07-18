import { View, Text, Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  Keyframe,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PlayerControls from "@/components/PlayerControls";
import SongArtwork from "@/components/SongArtwork";
import SongInfo from "@/components/SongInfo";
import SongSlider from "@/components/SongSlider";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import { Track, useActiveTrack } from "react-native-track-player";
import FloatingPlayer from "@/components/FloatingPlayer";

export default function player() {
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

  const { height } = Dimensions.get("screen");

  const { bottom } = useSafeAreaInsets();

  const y = useSharedValue(height);

  const o = useSharedValue(y.value / height);
  const floatingOpacity = useAnimatedStyle(() => ({
    opacity: o.value,
  }));

  const animatedPlayerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(y.value, {
          duration: 300,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      y.value = e.absoluteY;
      // y.value = withTiming(e.absoluteY, {
      //   duration: 100,
      //   easing: Easing.linear,
      // });
      o.value = e.absoluteY / height;
    })
    .onEnd((e) => {
      if (e.velocityY < -500) {
        y.value = withTiming(80, {
          duration: 100,
          easing: Easing.linear,
        });

        o.value = withTiming(0, {
          duration: 500,
          easing: Easing.linear,
        });
      } else if (e.velocityY > 500) {
        y.value = withTiming(height, {
          duration: 100,
          easing: Easing.linear,
        });

        o.value = withTiming(1, {
          duration: 500,
          easing: Easing.linear,
        });
      } else if (y.value < height / 2) {
        y.value = withTiming(80, {
          duration: 100,
          easing: Easing.linear,
        });
        o.value = 0;
      } else if (y.value > height / 2) {
        y.value = withTiming(height, {
          duration: 100,
          easing: Easing.linear,
        });
        o.value = 1;
      } else {
        y.value = withTiming(height, {
          duration: 100,
          easing: Easing.linear,
        });
        o.value = 1;
      }
    })
    .runOnJS(true);

  return (
    <Animated.View
      style={[animatedPlayerStyle]}
      className="h-full w-full bg-blue-300 absolute bottom-0"
    >
      <GestureDetector gesture={maximiseHandler}>
        <Animated.View className="bg-green-300 w-full h-full -top-20 relative">
          <Animated.View className="bg-purple-300 h-20" style={floatingOpacity}>
            <FloatingPlayer />
          </Animated.View>
          <View className="h-full flex-1 items-center justify-center absolute">
            <View className="h-full p-4 flex-1 items-center justify-evenly">
              <SongArtwork track={track} />
              <View className="">
                <SongInfo track={track} />
                <SongSlider />
                <PlayerControls />
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
