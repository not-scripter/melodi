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
        translateY: withTiming(y.value, {
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
      if (e.velocityY < -500) {
        y.value = withTiming(80, {
          duration: 300,
          easing: Easing.linear,
        });
      } else if (e.velocityY > 500) {
        y.value = withTiming(height, {
          duration: 200,
          easing: Easing.linear,
        });
      } else if (y.value < height / 2) {
        y.value = withTiming(80, {
          duration: 300,
          easing: Easing.linear,
        });
      } else if (y.value > height / 2) {
        y.value = withTiming(height, {
          duration: 200,
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
    <>
      <View className="h-full w-full bg-pink-200">
        <Text className="text-3xl text-center">Home</Text>
      </View>
      <Animated.View
        style={[animatedPlayerStyle]}
        className="h-full w-full bg-blue-300 absolute bottom-0"
      >
        <GestureDetector gesture={maximiseHandler}>
          <Animated.View className="bg-green-300/40 w-full h-full -top-20 relative">
            <View className="bg-purple-300/20 h-20">
              <Text className="text-center text-3xl">Floating Player</Text>
            </View>
            <View className="h-full flex-1 items-center justify-center absolute">
              <Text className="text-center text-3xl">Full Player</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
}
