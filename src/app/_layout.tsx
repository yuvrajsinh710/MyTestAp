import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RouterThemeProvider,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { ThemeProvider, useAppTheme } from "@/context/ThemeContext";

SplashScreen.preventAutoHideAsync();

// react-native-country-picker-modal still imports the deprecated core
// SafeAreaView; the warning is dev-only noise we can't fix from app code.
LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);

function AppContent() {
  const { theme } = useAppTheme();

  return (
    <RouterThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </RouterThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
