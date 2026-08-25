import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, Text, View, StyleSheet } from 'react-native';

import { MaxContentWidth } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

export default function AppTabs() {
  const { colors } = useAppTheme();

  return (
    <Tabs style={[styles.tabs, { backgroundColor: colors.background }]}>
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="listing" href="/listing" asChild>
            <TabButton>Listing</TabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton>Settings</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
      <TabSlot style={styles.slot} />
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View
        style={[
          styles.tabButtonView,
          { backgroundColor: isFocused ? colors.primarySoft : 'transparent' },
        ]}>
        <Text
          style={[
            styles.tabButtonText,
            { color: isFocused ? colors.primary : colors.textSecondary },
          ]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        { backgroundColor: colors.background, borderBottomColor: colors.border },
      ]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.brandText, { color: colors.primary }]}>MyTestAp</Text>

        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  slot: {
    flex: 1,
  },
  tabListContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: 8,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
