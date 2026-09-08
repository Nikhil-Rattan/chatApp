import React, { memo, useCallback } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { Avatar } from '@/components/Avatar';
import { AnimatedEntrance } from '@/components/AnimatedEntrance';
import { ScreenState } from '@/components/ScreenState';
import { colors } from '@/theme/theme';
import type { User } from '@/types/models';
import { useChats } from '@/screens/chats/useChats';
import { styles } from '@/screens/chats/styles';

type RowProps = { user: User; onPress: (user: User) => void };

const ContactRow = memo(({ user, onPress }: RowProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={`Open conversation with ${user.name}`}
    onPress={() => onPress(user)}
    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
  >
    <Avatar uri={user.avatar} name={user.name} />
    <View style={styles.rowCopy}>
      <View style={styles.rowTitleLine}>
        <Text numberOfLines={1} style={styles.name}>
          {user.name}
        </Text>
        <Text style={styles.time}>Now</Text>
      </View>
      <Text numberOfLines={1} style={styles.preview}>
        Tap to start your conversation
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.iconMuted} />
  </Pressable>
));

const Separator = () => <View style={styles.separator} />;

export const ChatsScreen = () => {
  const {
    contacts,
    isLoading,
    isError,
    refetch,
    isRefetching,
    isFetchingNextPage,
    openChat,
    loadMore,
  } = useChats();
  const renderItem = useCallback(
    ({ item }: { item: User }) => <ContactRow user={item} onPress={openChat} />,
    [openChat],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>MESSAGES</Text>
          <Text style={styles.title}>Chats</Text>
        </View>
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>
      {isLoading ? (
        <ScreenState loading />
      ) : isError && !contacts.length ? (
        <ScreenState
          title="Couldn’t load chats"
          message="Check your connection and try again."
          onRetry={refetch}
        />
      ) : (
        <AnimatedEntrance style={styles.list}>
          <FlashList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={Separator}
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            ListEmptyComponent={
              <ScreenState
                title="No conversations"
                message="Your contacts will appear here."
              />
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  color={colors.primary}
                  style={styles.footer}
                />
              ) : null
            }
          />
        </AnimatedEntrance>
      )}
    </SafeAreaView>
  );
};
