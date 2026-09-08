import React, { memo, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { Avatar } from '@/components/Avatar';
import { ScreenState } from '@/components/ScreenState';
import { colors } from '@/theme/theme';
import type { Message } from '@/types/models';
import type { RootStackParamList } from '@/types/navigation';
import { useChat } from '@/screens/chat/useChat';
import { styles } from '@/screens/chat/styles';

const MessageBubble = memo(({ message }: { message: Message }) => {
  const outgoing = message.direction === 'outgoing';
  return (
    <View
      style={[
        styles.bubbleLine,
        outgoing ? styles.outgoingLine : styles.incomingLine,
      ]}
    >
      <View
        style={[
          styles.bubble,
          outgoing ? styles.outgoingBubble : styles.incomingBubble,
        ]}
      >
        <Text style={[styles.body, outgoing && styles.outgoingBody]}>
          {message.body}
        </Text>
        <Text style={[styles.bubbleMeta, outgoing && styles.outgoingMeta]}>
          {message.pending ? 'Sending…' : outgoing ? 'Delivered' : 'Contact'}
        </Text>
      </View>
    </View>
  );
});

const MessageSeparator = () => <View style={styles.messageGap} />;

export const ChatScreen = (
  props: NativeStackScreenProps<RootStackParamList, 'Chat'>,
) => {
  const { navigation } = props;
  const {
    user,
    data,
    isLoading,
    isError,
    refetch,
    text,
    setText,
    submit,
    openProfile,
    isBlocked,
    isSending,
  } = useChat(props);
  const renderItem = useCallback(
    ({ item }: { item: Message }) => <MessageBubble message={item} />,
    [],
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={navigation.goBack}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={30} color={colors.text} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={openProfile}
          style={styles.profileButton}
        >
          <Avatar uri={user.avatar} name={user.name} size={42} />
          <View style={styles.headerCopy}>
            <Text numberOfLines={1} style={styles.headerName}>
              {user.name}
            </Text>
            <Text style={styles.status}>
              {isBlocked ? 'Blocked' : 'Active now'}
            </Text>
          </View>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {isLoading ? (
          <ScreenState loading />
        ) : isError ? (
          <ScreenState
            title="Messages unavailable"
            message="We couldn’t load this conversation."
            onRetry={refetch}
          />
        ) : (
          <FlashList
            data={data ?? []}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={styles.messages}
            ItemSeparatorComponent={MessageSeparator}
            keyboardDismissMode={
              Platform.OS === 'ios' ? 'interactive' : 'on-drag'
            }
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <ScreenState
                title="Start the conversation"
                message="Send a friendly hello below."
              />
            }
            maintainVisibleContentPosition={{
              startRenderingFromBottom: true,
              autoscrollToBottomThreshold: 0.2,
            }}
          />
        )}
        {isBlocked && (
          <Text style={styles.blockedNotice}>
            Unblock this contact from their profile to send messages.
          </Text>
        )}
        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Message"
            value={text}
            onChangeText={setText}
            placeholder={isBlocked ? 'Contact is blocked' : 'Write a message…'}
            placeholderTextColor={colors.inputPlaceholder}
            style={styles.input}
            multiline
            editable={!isBlocked}
            maxLength={1000}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send message"
            disabled={!text.trim() || isBlocked || isSending}
            onPress={submit}
            style={({ pressed }) => [
              styles.send,
              (!text.trim() || isBlocked || isSending) && styles.sendDisabled,
              pressed && styles.sendPressed,
            ]}
          >
            <Ionicons name="arrow-up" size={22} color={colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
