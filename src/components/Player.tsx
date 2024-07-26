import { RootState } from "@/app/store";
import FloatingPlayer from "@/components/FloatingPlayer";
import FullPlayer from "@/components/FullPlayer";
import { setActiveTrack } from "@/features/slices/trackSlice";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, {
  Event,
  Track,
  useActiveTrack,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import { addTrack, setupPlayer } from "rntp-service";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type localStateProps = "minimized" | "maximized" | "closed";

export default function Player() {
  const { height } = Dimensions.get("screen");
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { colors } = useAppTheme();
  const track: Track | undefined = useActiveTrack();

  const { activeTrack } = useSelector((state: RootState) => state.track);

  const [localState, setlocalState] = useState<localStateProps>("minimized");

  // TrackPlayer.addEventListener(
  //   Event.PlaybackProgressUpdated,
  //   ({ track, position }) => {
  //     console.log(track, position);
  //     // dispatch(
  //     //   setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
  //     // );
  //   },
  // );

  TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
    if (state === "playing" && localState === "closed") {
      y.value = height - bottom;
      o.value = 1;
      setlocalState("minimized");
    } else if (state === "stopped") {
      y.value = height + 80 + bottom;
      o.value = 0;
    }
  });

  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    ({ track }) => {
      dispatch(setActiveTrack({ activeTrack: track }));
    },
  );

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup && activeTrack) {
      await TrackPlayer.add(activeTrack);
    } else {
      await addTrack();
    }
  }

  useEffect(() => {
    setup();
  }, []);

  const y = useSharedValue(height - bottom);

  const o = useSharedValue(1);
  const floatingOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(o.value, {
      reduceMotion: ReduceMotion.Never,
    }),
  }));

  const fo = useSharedValue(1);
  const fullOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(fo.value, {
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
      setlocalState("maximized");
    }
  };

  useEffect(() => {
    if (localState === "minimized") {
      y.value = height - bottom;
      o.value = 1;
      fo.value = 0;
    } else if (localState === "maximized") {
      y.value = 80;
      o.value = 0;
      fo.value = 1;
    } else if (localState === "closed") {
      TrackPlayer.reset();
    }
  }, [localState]);

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      if (localState === "minimized") {
        y.value = e.absoluteY + 80;
        o.value = e.absoluteY / height;
        fo.value = e.translationY / -height;
      } else if (localState === "maximized") {
        y.value = e.translationY + 80;
        o.value = e.translationY / height;
        fo.value = e.y / height;
      }
    })
    .onEnd((e) => {
      if (e.velocityY < -500) {
        setlocalState("maximized");
      } else if (
        (localState === "minimized" && e.velocityY > 500) ||
        e.absoluteY > height - 80
      ) {
        setlocalState("closed");
      } else if (e.velocityY > 500) {
        setlocalState("minimized");
      } else if (e.translationY < -height / 2) {
        setlocalState("maximized");
      } else if (e.translationY > height / 2) {
        setlocalState("minimized");
      } else if (e.absoluteY > height / 2) {
        setlocalState("maximized");
      } else if (e.absoluteY < height / 2) {
        setlocalState("minimized");
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
          style={{ backgroundColor: colors.background }}
        >
          <Pressable onPress={handleTap}>
            <Animated.View className="h-20" style={[floatingOpacity]}>
              <FloatingPlayer track={track} />
            </Animated.View>
          </Pressable>
          <Animated.View
            style={[fullOpacity]}
            className="h-full flex-1 items-center justify-center absolute"
          >
            <FullPlayer track={track} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
