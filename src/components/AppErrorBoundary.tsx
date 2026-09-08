import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { styles } from '@/components/styles';
import { colors } from '@/theme/theme';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__DEV__)
      console.error('Unhandled application error', error, info.componentStack);
  }

  private reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={styles.errorBoundary}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.danger} />
        <Text style={styles.stateTitle}>Something went wrong</Text>
        <Text style={styles.stateMessage}>
          The app hit an unexpected error. Your data is safe.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={this.reset}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Recover</Text>
        </Pressable>
      </View>
    );
  }
}
