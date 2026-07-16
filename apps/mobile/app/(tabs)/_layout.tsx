import { Tabs } from 'expo-router';
import { Bookmark, FileText, Home, MessageCircle, Search, Settings } from 'lucide-react-native';

import { colors } from '@/components/ui/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtle,
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopColor: colors.border
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="brief"
        options={{
          title: 'Brief',
          tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => <Bookmark color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
