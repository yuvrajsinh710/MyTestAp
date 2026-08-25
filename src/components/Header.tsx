import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/context/ThemeContext";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { theme, colors, toggleTheme } = useAppTheme();

  const isDark = theme === "dark";

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.titleGroup}>
          <View
            style={[
              styles.titleAccent,
              {
                backgroundColor: colors.primary,
              },
            ]}
          />

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            {title}
          </Text>
        </View>

        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.themeButton,
            {
              backgroundColor: pressed
                ? colors.backgroundSelected
                : colors.primarySoft,
            },
          ]}
        >
          <Text style={styles.icon}>{isDark ? "☀️" : "🌙"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleAccent: {
    width: 4,
    height: 22,
    borderRadius: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
});
