import { Alert, Platform } from "react-native";

// In-app permission dialog shown before displaying device info and before
// opening the photo library. Android has no runtime permission for the device
// fields we read, and the Android 13+ system photo picker needs none either,
// so this dialog is what makes the app ask the user first.
export function askPermission(
  title: string,
  message: string,
): Promise<boolean> {
  if (Platform.OS === "web") {
    // Alert.alert is a no-op on web.
    return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  }

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: "Don't Allow", style: "cancel", onPress: () => resolve(false) },
        { text: "Allow", onPress: () => resolve(true) },
      ],
      { cancelable: false },
    );
  });
}
