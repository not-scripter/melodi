import FloatingPlayer from "@/components/FloatingPlayer";
import FullPlayer from "@/components/FullPlayer";
import { setActiveTrack } from "@/features/track/trackSlice";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ImageColors from "react-native-image-colors";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, {
  Event,
  Track,
  useActiveTrack,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import SongSlider from "./SongSlider";
import { RootState } from "@/app/store";
import { addTrack, setupPlayer } from "rntp-service";

export default function Player() {
  const dispatch = useDispatch();

  // TrackPlayer.addEventListener(
  //   Event.PlaybackProgressUpdated,
  //   ({ track, position }) => {
  //     console.log(track, position);
  //     // dispatch(
  //     //   setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
  //     // );
  //   },
  // );

  const [localState, setlocalState] = useState("minimized");
  TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
    if (state === "playing" && localState === "closed") {
      y.value = height;
      setlocalState("minimized");
    } else if (state === "stopped") {
      y.value = height + 80;
    }
  });
  useEffect(() => {}, [localState]);

  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    ({ track }) => {
      dispatch(setActiveTrack({ activeTrack: track }));
    },
  );

  const { activeTrack } = useSelector((state: RootState) => state.activeTrack);

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup && activeTrack) {
      await TrackPlayer.add(activeTrack);
    } else {
      await addTrack();
    }
    // setisPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

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
  const floatingOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(o.value, {
      reduceMotion: ReduceMotion.Never,
    }),
  }));

  const animatedPlayerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(y.value, {
          damping: 20,
          reduceMotion: ReduceMotion.Never,
        }),
      },
    ],
  }));

  const handleTap = () => {
    if (localState === "minimized") {
      y.value = 80;
      o.value = 0;
    }
  };

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      if (localState === "minimized") {
        y.value = e.absoluteY + 80;
        o.value = e.absoluteY / height;
      } else if (localState === "maximized") {
        y.value = e.translationY + 80;
        o.value = 0;
      }
    })
    .onEnd((e) => {
      if (e.velocityY < -500) {
        y.value = 80;
        o.value = 0;

        setlocalState("maximized");
      } else if (
        (localState === "minimized" && e.velocityY > 500) ||
        e.absoluteY > height - 80
      ) {
        TrackPlayer.reset();
        setlocalState("closed");
      } else if (e.velocityY > 500) {
        y.value = height;
        o.value = 1;
        setlocalState("minimized");
      } else if (e.translationY < -height / 2) {
        y.value = 80;
        o.value = 0;
        setlocalState("maximized");
      } else if (e.translationY > height / 2) {
        y.value = height;
        setlocalState("minimized");
        o.value = 1;
      }

      // else {
      //   y.value = height;
      //   o.value = 1;
      //   setlocalState("minimized");
      // }
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
          <Pressable onPress={handleTap}>
            <Animated.View className="h-20 pb-4" style={[floatingOpacity]}>
              <FloatingPlayer track={track} />
            </Animated.View>
          </Pressable>
          <View className="h-full flex-1 items-center justify-center absolute">
            <FullPlayer track={track} />
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
