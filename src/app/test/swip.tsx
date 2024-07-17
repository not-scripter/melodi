import { View, Text, Dimensions, Modal } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  Swipeable,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import Stack from "expo-router/stack";

export default function swip() {
  const { height } = Dimensions.get("screen");

  const minHeight = 0;
  const maxHeight = height;
  const expandedHeight = height * 0.8;

  const position = useSharedValue("minimised");
  const playerHeight = useSharedValue(-minHeight);
  const navHeight = useSharedValue(0);

  const dragBuffer = 40;

  function clamp(val: any, min: any, max: any) {
    return Math.min(Math.max(val, min), max);
  }

  const springConfig: WithSpringConfig = {
    damping: 50,
    mass: 0.3,
    stiffness: 120,
    overshootClamping: true,
    restSpeedThreshold: 0.3,
    restDisplacementThreshold: 0.3,
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      playerHeight.value = e.translationY;
    })
    .onEnd((e) => {
      const shouldExpand =
        (position.value === "maximised" &&
          -playerHeight.value < maxHeight - dragBuffer) ||
        (position.value === "minimised" &&
          -playerHeight.value > minHeight + dragBuffer);
      // Snap to minimised position if the sheet is dragged down from expanded position
      const shouldMinimise =
        position.value === "expanded" &&
        -playerHeight.value < expandedHeight - dragBuffer;
      // Snap to maximised position if the sheet is dragged up from expanded position
      const shouldMaximise =
        position.value === "expanded" &&
        -playerHeight.value > expandedHeight + dragBuffer;
      // Update the sheet's position with spring animation
      if (shouldExpand) {
        navHeight.value = withSpring(0, springConfig);
        playerHeight.value = withSpring(-expandedHeight, springConfig);
        position.value = "expanded";
      } else if (shouldMaximise) {
        navHeight.value = withSpring(navHeight.value + 10, springConfig);
        playerHeight.value = withSpring(-maxHeight, springConfig);
        position.value = "maximised";
      } else if (shouldMinimise) {
        navHeight.value = withSpring(0, springConfig);
        playerHeight.value = withSpring(-minHeight, springConfig);
        position.value = "minimised";
      } else {
        playerHeight.value = withSpring(
          position.value === "expanded"
            ? -expandedHeight
            : position.value === "maximised"
              ? -maxHeight
              : -minHeight,
          springConfig,
        );
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: playerHeight.value - 100 }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View className="h-full">
        <Animated.View
          style={[{}, animatedStyle]}
          className="bg-red-300 w-full h-full bottom-[-796px]"
        />
        <Stack.Screen options={{ headerShown: false }} />
      </View>
    </GestureDetector>
  );
}
