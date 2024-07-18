import FloatingPlayer from "@/components/FloatingPlayer";
import FullPlayer from "@/components/FullPlayer";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
      className="h-full w-full absolute bottom-0 left-0"
    >
      <GestureDetector gesture={maximiseHandler}>
        <Animated.View
          className="w-full h-full -top-20 relative"
          style={{ backgroundColor: bgColor }}
        >
          <Animated.View className="h-20 pb-4" style={[floatingOpacity]}>
            <FloatingPlayer track={track} />
          </Animated.View>
          <View className="h-full flex-1 items-center justify-center absolute">
            <FullPlayer track={track} />
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
