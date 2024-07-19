import FloatingPlayer from "@/components/FloatingPlayer";
import FullPlayer from "@/components/FullPlayer";
import { hasDarkPseudoClass } from "nativewind/dist/utils/selector";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  WithSpringConfig,
  ReduceMotion,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Track, useActiveTrack } from "react-native-track-player";

export default function Player() {
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

  const o = useSharedValue(1);
  const [state, setstate] = useState("minimized");
  const floatingOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(o.value),
  }));

  const animatedPlayerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(y.value, {
          damping: 20,
        }),
      },
    ],
  }));

  const tapGesture = Gesture.Tap().onEnd(() => {
    y.value = 80;
    o.value = 0;
  });

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      y.value = e.absoluteY;
      o.value = e.absoluteY / height;
      console.log(e.absoluteY / -height);
    })
    .onEnd((e) => {
      if (e.velocityY < -500) {
        y.value = 80;

        o.value = 0;

        setstate("maximized");
      } else if (e.velocityY > 500) {
        y.value = height;

        o.value = 1;

        setstate("minimized");
      } else if (e.translationY < -height / 2) {
        y.value = 80;
        o.value = 0;
        setstate("maximized");
      } else if (e.translationY > height / 2) {
        y.value = height;
        setstate("minimized");
        o.value = 1;
      } else {
        y.value = height;
        o.value = 1;
        setstate("minimized");
      }
    })
    .runOnJS(true);

  return (
    <Animated.View
      style={[animatedPlayerStyle]}
      className="h-full w-full absolute bottom-0 left-0"
    >
      <GestureDetector gesture={maximiseHandler}>
        <Animated.View
          className="w-full h-full -top-20 relative"
          style={{ backgroundColor: bgColor }}
        >
          <GestureDetector gesture={tapGesture}>
            <Animated.View className="h-20 pb-4" style={[floatingOpacity]}>
              <FloatingPlayer track={track} />
            </Animated.View>
          </GestureDetector>
          <View className="h-full flex-1 items-center justify-center absolute">
            <FullPlayer track={track} />
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
