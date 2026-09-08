import { StyleSheet } from 'react-native';
import { colors } from '@/theme/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { flex: 1 },
  header: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.successSoft,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  onlineText: { fontSize: 12, color: colors.success, fontWeight: '700' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  row: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  rowPressed: { backgroundColor: colors.primarySoft },
  rowCopy: { flex: 1, marginLeft: 13 },
  rowTitleLine: { flexDirection: 'row', alignItems: 'center' },
  name: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text },
  time: { fontSize: 11, color: colors.textMuted },
  preview: { fontSize: 13, color: colors.textMuted, marginTop: 5 },
  separator: {
    height: 1,
    marginHorizontal: 12,
    backgroundColor: colors.border,
  },
  footer: { padding: 18 },
});
