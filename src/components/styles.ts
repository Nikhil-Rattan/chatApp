import { StyleSheet } from 'react-native';
import { colors } from '@/theme/theme';

export const styles = StyleSheet.create({
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  avatarInitials: { fontWeight: '800', color: colors.primary },
  stateContainer: {
    flex: 1,
    minHeight: 260,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginTop: 12,
  },
  stateMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 11,
    backgroundColor: colors.primary,
  },
  retryText: { color: colors.white, fontWeight: '700' },
  errorBoundary: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
