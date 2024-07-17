import { StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const END_POSITION = 200;

export default function App() {
  const onUp = useSharedValue(true);
  const onDown = useSharedValue(true);
  const position = useSharedValue(0);

  const { height } = Dimensions.get("window");
  const maxTranslateY = height / 2;

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onUpdate((e) => {
      if (e.translationY < maxTranslateY) {
        position.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (position.value > maxTranslateY) {
        position.value = maxTranslateY;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginBottom: 30,
  },
});
