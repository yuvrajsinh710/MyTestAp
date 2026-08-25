import { NativeTabs } from "expo-router/unstable-native-tabs";

import { useAppTheme } from "@/context/ThemeContext";

export default function AppTabs() {
  const { colors } = useAppTheme();

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.primarySoft}
      iconColor={{
        default: colors.textSecondary,
        selected: colors.primary,
      }}
      labelStyle={{
        default: {
          color: colors.textSecondary,
        },
        selected: {
          color: colors.primary,
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon md="home" sf="house.fill" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="listing">
        <NativeTabs.Trigger.Label>Listing</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon md="list" sf="list.bullet" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon md="settings" sf="gearshape.fill" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
