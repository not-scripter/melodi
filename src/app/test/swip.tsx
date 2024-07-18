import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function swip() {
  const { height } = Dimensions.get("screen");
  const y = useSharedValue(height);

  const animatedPlayerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(y.value - height, {
          duration: 300,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      y.value = withTiming(e.absoluteY, {
        duration: 0,
        easing: Easing.linear,
      });
    })
    .onEnd((e) => {
      if (y.value > height / 2 || e.velocityY < -1000) {
        y.value = withTiming(0, {
          duration: 300,
          easing: Easing.linear,
        });
      } else {
        y.value = withTiming(height, {
          duration: 200,
          easing: Easing.linear,
        });
      }
    })
    .runOnJS(true);

  return (
    <Animated.View style={[animatedPlayerStyle]}>
      <View className="h-full w-full bg-blue-300" style={{}}>
        <GestureDetector gesture={maximiseHandler}>
          <Animated.View className="bg-red-300 absolute w-full h-40 bottom-0 left-0 translate-y-20" />
        </GestureDetector>
      </View>
    </Animated.View>
  );
}
