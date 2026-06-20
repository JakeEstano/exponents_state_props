/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

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
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export type ThemeId = 'nordic' | 'moss' | 'sahara' | 'void';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  screenBg: string;
  cardBg: string;
  childBg: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  accentTertiary: string;
  accentTextPrimary: string;
  accentTextSecondary: string;
  accentTextTertiary: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  progressBg: string;
  progressBar: string;
}

export const Themes: Record<ThemeId, ThemeConfig> = {
  nordic: {
    id: 'nordic',
    name: 'Nordic Light 🏔️',
    screenBg: '#F1F3F5',
    cardBg: '#FFFFFF',
    childBg: '#F8F9FA',
    textPrimary: '#1A1D20',
    textSecondary: '#687076',
    accentPrimary: '#006ADC',
    accentSecondary: '#E1F0FF',
    accentTertiary: '#FFFFFF',
    accentTextPrimary: '#FFFFFF',
    accentTextSecondary: '#006ADC',
    accentTextTertiary: '#687076',
    border: '#D7DBDF',
    badgeBg: '#E1F0FF',
    badgeText: '#006ADC',
    progressBg: '#E6E8EB',
    progressBar: '#006ADC',
  },
  moss: {
    id: 'moss',
    name: 'Kyoto Moss 🎋',
    screenBg: '#F2F4F1',
    cardBg: '#FFFFFF',
    childBg: '#F8FAF7',
    textPrimary: '#1B221A',
    textSecondary: '#626D60',
    accentPrimary: '#3B652E',
    accentSecondary: '#E3ECD9',
    accentTertiary: '#FFFFFF',
    accentTextPrimary: '#FFFFFF',
    accentTextSecondary: '#3B652E',
    accentTextTertiary: '#626D60',
    border: '#D2DCD0',
    badgeBg: '#E3ECD9',
    badgeText: '#3B652E',
    progressBg: '#E6EBE4',
    progressBar: '#3B652E',
  },
  sahara: {
    id: 'sahara',
    name: 'Sahara Dawn 🏜️',
    screenBg: '#FCF6F0',
    cardBg: '#FFFFFF',
    childBg: '#FFFBF7',
    textPrimary: '#3C2415',
    textSecondary: '#8B6D5C',
    accentPrimary: '#C25E00',
    accentSecondary: '#FCE8D8',
    accentTertiary: '#FFFFFF',
    accentTextPrimary: '#FFFFFF',
    accentTextSecondary: '#C25E00',
    accentTextTertiary: '#8B6D5C',
    border: '#EEDCD0',
    badgeBg: '#FCE8D8',
    badgeText: '#C25E00',
    progressBg: '#F6ECE4',
    progressBar: '#C25E00',
  },
  void: {
    id: 'void',
    name: 'Stark Void 🌌',
    screenBg: '#0B0C0E',
    cardBg: '#121316',
    childBg: '#17191D',
    textPrimary: '#EEEEEE',
    textSecondary: '#888E96',
    accentPrimary: '#FFFFFF',
    accentSecondary: '#222326',
    accentTertiary: '#121316',
    accentTextPrimary: '#0B0C0E',
    accentTextSecondary: '#FFFFFF',
    accentTextTertiary: '#888E96',
    border: '#2E3033',
    badgeBg: '#222326',
    badgeText: '#FFFFFF',
    progressBg: '#1E2022',
    progressBar: '#FFFFFF',
  },
};



