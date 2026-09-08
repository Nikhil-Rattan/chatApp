import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Avatar } from '@/components/Avatar';
import { AnimatedEntrance } from '@/components/AnimatedEntrance';
import { ScreenState } from '@/components/ScreenState';
import type { RootStackParamList } from '@/types/navigation';
import { useProfile } from '@/screens/profile/useProfile';
import { styles } from '@/screens/profile/styles';

export const ProfileScreen = (
  props: NativeStackScreenProps<RootStackParamList, 'Profile'>,
) => {
  const { user, isLoading, refetch, isBlocked, toggleBlocked } =
    useProfile(props);

  if (isLoading) return <ScreenState loading />;
  if (!user)
    return (
      <ScreenState
        title="Profile unavailable"
        message="We couldn’t load this contact."
        onRetry={refetch}
      />
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnimatedEntrance style={styles.hero}>
        <View style={styles.avatarRing}>
          <Avatar uri={user.avatar} name={user.name} size={104} />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.presence}>
          {isBlocked ? 'Blocked contact' : 'Active contact'}
        </Text>
      </AnimatedEntrance>
      <AnimatedEntrance delay={80} style={styles.card}>
        <InfoRow label="Email" value={user.email} />
        <View style={styles.divider} />
        <InfoRow label="Phone number" value={user.phone} />
        <View style={styles.divider} />
        <InfoRow label="Contact ID" value={`#${user.id}`} />
      </AnimatedEntrance>
      <AnimatedEntrance delay={140}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            isBlocked ? `Unblock ${user.name}` : `Block ${user.name}`
          }
          onPress={toggleBlocked}
          style={({ pressed }) => [
            styles.blockButton,
            isBlocked && styles.unblockButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.blockText, isBlocked && styles.unblockText]}>
            {isBlocked ? 'Unblock contact' : 'Block contact'}
          </Text>
        </Pressable>
        <Text style={styles.help}>
          {isBlocked
            ? 'They can be unblocked at any time.'
            : 'Blocking prevents you from sending messages to this contact.'}
        </Text>
      </AnimatedEntrance>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text selectable style={styles.infoValue}>
      {value}
    </Text>
  </View>
);
