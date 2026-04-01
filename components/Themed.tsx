import { Text as DefaultText, View as DefaultView } from 'react-native';
import Colors from '@/constants/Colors';
import { useFinanceStore } from '@/store/useFinanceStore';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { themeMode } = useFinanceStore();
  const theme = themeMode === 'amoled' ? 'amoled' : (themeMode === 'dark' ? 'dark' : 'light');
  const colorFromProps = props[theme === 'amoled' ? 'dark' : (theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark'];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color, fontFamily: 'MartianMono' }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
