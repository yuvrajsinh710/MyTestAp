import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const DURATION = 600;
// How long the logo holds on screen before the fade-out starts — without
// this the branded splash is visible for only a blink.
const HOLD_MS = 3000;

let resolveSplashDone = () => {};
// Home waits on this before showing its permission dialog, so the dialog
// never pops up on top of the splash logo.
export const splashDone = new Promise<void>((resolve) => {
  resolveSplashDone = resolve;
});

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  const finishSplash = () => {
    setVisible(false);
    resolveSplashDone();
  };

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = (
    <Image
      style={styles.splashImage}
      source={require("@/assets/images/splash-icon.png")}
      contentFit="contain"
    />
  );

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        "worklet";
        if (finished) {
          scheduleOnRN(finishSplash);
        }
      })}
      style={styles.splashOverlay}
    >
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setTimeout(() => setAnimate(true), HOLD_MS);
        });
      }}
      style={styles.splashOverlay}
    >
      {image}
    </View>
  );
}

const styles = StyleSheet.create({
  splashImage: {
    width: 200,
    height: 200,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
});
