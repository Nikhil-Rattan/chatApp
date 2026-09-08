import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { colors } from '@/theme/theme';
import { styles } from '@/components/styles';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type Props = {
  loading?: boolean;
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export const ScreenState = ({
  loading,
  title = 'Nothing here yet',
  message,
  onRetry,
}: Props) => (
  <View style={styles.stateContainer}>
    {loading ? (
      <ActivityIndicator size="large" color={colors.primary} />
    ) : (
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={46}
        color={colors.primary}
      />
    )}
    <Text style={styles.stateTitle}>{loading ? 'Loading…' : title}</Text>
    {!!message && <Text style={styles.stateMessage}>{message}</Text>}
    {!!onRetry && !loading && (
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={styles.retryButton}
      >
        <Text style={styles.retryText}>Try again</Text>
      </Pressable>
    )}
  </View>
);
