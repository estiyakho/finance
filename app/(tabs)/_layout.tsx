import { useColorScheme } from '@/components/useColorScheme';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { accentColor } = useFinanceStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accentColor,
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'MartianMono',
          fontSize: 10,
          marginBottom: 10,
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#111',
          height: 80,
          paddingTop: 10,
          paddingBottom: 10,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="receipt-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
