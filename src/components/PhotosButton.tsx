import * as ImagePicker from "expo-image-picker";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

type PhotosButtonProps = {
  hasPhoto: boolean;
  onPicked: (uri: string) => void;
};

export default function PhotosButton({ hasPhoto, onPicked }: PhotosButtonProps) {
  const { colors } = useAppTheme();

  const handleOpenPhotos = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow photo access from your device settings to select photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      onPicked(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={handleOpenPhotos}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? colors.primaryPressed : colors.primary,
        },
      ]}
    >
      <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
        {hasPhoto ? "Change Photo" : "Photos"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
