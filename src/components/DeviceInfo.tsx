import * as Application from "expo-application";
import * as Device from "expo-device";
import { Platform, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

export default function DeviceInfo() {
  const { colors } = useAppTheme();

  const deviceType =
    Device.deviceType === Device.DeviceType.PHONE
      ? "Phone"
      : Device.deviceType === Device.DeviceType.TABLET
        ? "Tablet"
        : "Unknown";

  const androidId =
    Platform.OS === "android" ? Application.getAndroidId() : "Not available";

  const rows = [
    { label: "Device Name", value: Device.deviceName ?? "Not available" },
    { label: "Manufacturer", value: Device.manufacturer ?? "Not available" },
    { label: "Model", value: Device.modelName ?? "Not available" },
    { label: "Android ID", value: androidId },
    { label: "OS", value: Platform.OS },
    { label: "OS Version", value: Device.osVersion ?? "Not available" },
    { label: "Device Type", value: deviceType },
  ];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.headingRow}>
        <Text style={[styles.heading, { color: colors.text }]}>
          Device Information
        </Text>

        <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {Platform.OS.toUpperCase()}
          </Text>
        </View>
      </View>

      {rows.map((row, index) => (
        <View
          key={row.label}
          style={[
            styles.row,
            index < rows.length - 1 && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {row.label}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: colors.text,
              },
            ]}
            numberOfLines={1}
          >
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: "#0B1526",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  heading: {
    fontSize: 17,
    fontWeight: "800",
  },

  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
  },

  label: {
    fontSize: 13.5,
    flex: 1,
  },

  value: {
    fontSize: 14.5,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
});
