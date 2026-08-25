/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0B1526',
    background: '#F7F9FC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#DCEBFB',
    textSecondary: '#5B6472',
    primary: '#208AEF',
    primaryPressed: '#1573D0',
    primarySoft: '#E3F0FD',
    onPrimary: '#FFFFFF',
    border: '#E4E9F0',
    danger: '#D93843',
    success: '#1E9E5A',
    successSoft: '#E7F6EE',
  },
  dark: {
    text: '#F2F5F9',
    background: '#0C0F14',
    backgroundElement: '#171B22',
    backgroundSelected: '#1D3A55',
    textSecondary: '#98A2B0',
    primary: '#4DA3F5',
    primaryPressed: '#77B9F8',
    primarySoft: '#132A44',
    onPrimary: '#06121F',
    border: '#242A33',
    danger: '#F2606A',
    success: '#3FCB82',
    successSoft: '#12301F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
