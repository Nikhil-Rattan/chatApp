import React, { memo, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from '@/components/styles';

type Props = { uri: string; name: string; size?: number };

export const Avatar = memo(({ uri, name, size = 52 }: Props) => {
  const [failed, setFailed] = useState(false);
  const dynamicStyle = { width: size, height: size, borderRadius: size / 2 };

  if (failed || !uri) {
    return (
      <View style={[styles.avatarFallback, dynamicStyle]}>
        <Text style={[styles.avatarInitials, { fontSize: size * 0.34 }]}>
          {initials(name)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={dynamicStyle}
      onError={() => setFailed(true)}
    />
  );
});

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || '?';
