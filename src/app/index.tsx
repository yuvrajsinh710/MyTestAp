import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { splashDone } from "@/components/animated-icon";
import DeviceInfo from "@/components/DeviceInfo";
import Header from "@/components/Header";
import PhotosButton from "@/components/PhotosButton";
import { useAppTheme } from "@/context/ThemeContext";
import { askPermission } from "@/utils/ask-permission";

type ConsentStatus = "pending" | "granted" | "denied";

export default function HomeScreen() {
  const { colors } = useAppTheme();

  // The device fields shown here need no Android runtime permission, so
  // consent is asked with an in-app dialog before anything is displayed.
  const [deviceInfoStatus, setDeviceInfoStatus] =
    useState<ConsentStatus>("pending");

  const requestDeviceInfoAccess = useCallback(async () => {
    const granted = await askPermission(
      "Allow MyTestAp to access device information?",
      "Your device name, model and OS version will be shown on this screen.",
    );
    setDeviceInfoStatus(granted ? "granted" : "denied");
  }, []);

  useEffect(() => {
    splashDone.then(requestDeviceInfoAccess);
  }, [requestDeviceInfoAccess]);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Header title="Home" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {deviceInfoStatus === "granted" ? (
          <DeviceInfo />
        ) : (
          <View
            style={[
              styles.consentCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.consentTitle, { color: colors.text }]}>
              Device Information
            </Text>

            <Text
              style={[styles.consentMessage, { color: colors.textSecondary }]}
            >
              {deviceInfoStatus === "denied"
                ? "Access was denied, so your device details stay hidden. You can allow access anytime."
                : "Waiting for permission to show your device details..."}
            </Text>

            {deviceInfoStatus === "denied" && (
              <Pressable
                onPress={requestDeviceInfoAccess}
                style={({ pressed }) => [
                  styles.consentButton,
                  {
                    backgroundColor: pressed
                      ? colors.primaryPressed
                      : colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.consentButtonText,
                    { color: colors.onPrimary },
                  ]}
                >
                  Allow Access
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {photoUri && (
          <View
            style={[
              styles.photoCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.photoTitle, { color: colors.text }]}>
              Selected Photo
            </Text>

            <Image
              source={{ uri: photoUri }}
              style={styles.photo}
              contentFit="cover"
            />
          </View>
        )}

        <PhotosButton hasPhoto={photoUri !== null} onPicked={setPhotoUri} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  photoCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    shadowColor: "#0B1526",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  photoTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  photo: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 14,
  },
  consentCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 12,
    shadowColor: "#0B1526",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  consentTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  consentMessage: {
    fontSize: 14,
    lineHeight: 21,
  },
  consentButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  consentButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
