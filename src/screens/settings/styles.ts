import { StyleSheet } from 'react-native';
import { colors } from '@/theme/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: 22, paddingBottom: 40 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.8,
    fontWeight: '800',
    color: colors.primary,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 24,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  appName: { fontSize: 20, fontWeight: '800', color: colors.white },
  tagline: { fontSize: 12, color: colors.primaryMuted, marginTop: 4 },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1.3,
    fontWeight: '800',
    color: colors.textMuted,
    marginTop: 28,
    marginBottom: 9,
    marginLeft: 4,
  },
  card: {
    borderRadius: 18,
    paddingHorizontal: 17,
    backgroundColor: colors.surface,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  label: { fontSize: 14, color: colors.text },
  value: {
    flexShrink: 1,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'right',
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  footer: {
    fontSize: 11,
    lineHeight: 17,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 30,
  },
});
