import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { useSettings } from '@/screens/settings/useSettings';
import { AnimatedEntrance } from '@/components/AnimatedEntrance';
import { colors } from '@/theme/theme';
import { styles } from '@/screens/settings/styles';

export const SettingsScreen = () => {
  const { appName, version, blockedCount } = useSettings();
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>PREFERENCES</Text>
        <Text style={styles.title}>Settings</Text>
        <AnimatedEntrance style={styles.brandCard}>
          <View style={styles.logo}>
            <Ionicons name="chatbubbles" size={25} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.appName}>{appName}</Text>
            <Text style={styles.tagline}>
              Simple conversations, beautifully made.
            </Text>
          </View>
        </AnimatedEntrance>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <AnimatedEntrance delay={90} style={styles.card}>
          <Row label="Built by" value="Nikhil" />
          <View style={styles.divider} />
          <Row label="App version" value={version} />
          <View style={styles.divider} />
          <Row label="Blocked contacts" value={String(blockedCount)} />
          <View style={styles.divider} />
          <Row label="Data source" value="Respond.io assessment API" />
        </AnimatedEntrance>
        <Text style={styles.footer}>
          Made with React Native · Powered by TanStack Query
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
