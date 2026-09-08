import type { NavigatorScreenParams } from '@react-navigation/native';
import type { User } from '@/types/models';

export type TabsParamList = {
  Chats: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  Chat: { user: User };
  Profile: { userId: number; initialUser?: User };
};
