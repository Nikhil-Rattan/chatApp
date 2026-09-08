import type { Theme } from '@react-navigation/native';

export const colors = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  primary: '#5B5CE2',
  primarySoft: '#ECECFF',
  primaryMuted: '#D9D9FF',
  primaryContrastMuted: '#D6D6FF',
  text: '#17182B',
  textMuted: '#777A90',
  iconMuted: '#B8B9C4',
  inputPlaceholder: '#999BAD',
  border: '#EAEBF1',
  danger: '#D84747',
  dangerBorder: '#F1CACA',
  dangerSoft: '#FFF4F4',
  success: '#20A36B',
  successBorder: '#C7EAD9',
  successSoft: '#E9F8F1',
  successSoftAlt: '#ECFAF3',
  shadow: '#222342',
  white: '#FFFFFF',
};

export const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.danger,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};
