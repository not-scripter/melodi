import { View, Text, Dimensions } from "react-native";
import React from "react";
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

export default function swip() {
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
    <>
      <View className="h-full w-full bg-pink-200">
        <Text className="text-3xl text-center">Home</Text>
      </View>
      <Animated.View
        style={[animatedPlayerStyle]}
        className="h-full w-full bg-blue-300 absolute bottom-0"
      >
        <GestureDetector gesture={maximiseHandler}>
          <Animated.View className="bg-green-300 w-full h-full -top-20 relative">
            <Animated.View
              className="bg-purple-300 h-20"
              style={floatingOpacity}
            >
              <Text className="text-center text-3xl">Floating Player</Text>
            </Animated.View>
            <View className="h-full flex-1 items-center justify-center absolute">
              <Text className="text-center text-3xl">Full Player</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
}
