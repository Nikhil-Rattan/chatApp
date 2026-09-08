import React from 'react';
import { Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { ChatsScreen } from '@/screens/chats/chats';
import { ChatScreen } from '@/screens/chat/chat';
import { ProfileScreen } from '@/screens/profile/profile';
import { SettingsScreen } from '@/screens/settings/settings';
import { colors } from '@/theme/theme';
import type { RootStackParamList, TabsParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

type TabIconProps = { color: string; focused: boolean };

const ChatsTabIcon = ({ color, focused }: TabIconProps) => (
  <Ionicons
    name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
    color={color}
    size={22}
  />
);

const SettingsTabIcon = ({ color, focused }: TabIconProps) => (
  <Ionicons
    name={focused ? 'settings' : 'settings-outline'}
    color={color}
    size={22}
  />
);

const ProfileBackButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={12}
      onPress={navigation.goBack}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        opacity: pressed ? 0.55 : 1,
      })}
    >
      <Ionicons name="arrow-back" color={colors.text} size={24} />
    </Pressable>
  );
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        height: 64,
        paddingTop: 7,
        paddingBottom: 8,
        borderTopColor: colors.border,
      },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
    }}
  >
    <Tab.Screen
      name="Chats"
      component={ChatsScreen}
      options={{ tabBarIcon: ChatsTabIcon }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ tabBarIcon: SettingsTabIcon }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: { backgroundColor: colors.background },
      headerTintColor: colors.text,
      headerTitleStyle: { fontWeight: '800' },
      contentStyle: { backgroundColor: colors.background },
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Contact profile',
        headerBackVisible: false,
        headerLeft: ProfileBackButton,
      }}
    />
  </Stack.Navigator>
);
