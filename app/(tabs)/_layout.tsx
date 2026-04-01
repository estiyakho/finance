import { useColorScheme } from '@/components/useColorScheme';
import { useFinanceStore, LABELS } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';
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
  const { accentColor, language, themeMode } = useFinanceStore();
  const labels = LABELS[language];
  const themeColors = Colors[themeMode];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accentColor,
        tabBarInactiveTintColor: themeColors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'MartianMono',
          fontSize: 10,
          marginBottom: 10,
        },
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.border,
          height: 80,
          paddingTop: 10,
          paddingBottom: 10,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: labels.home,
          tabBarIcon: ({ color }) => <TabBarIcon name="receipt-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarLabel: labels.stats,
          tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: labels.settings,
          tabBarIcon: ({ color }) => <TabBarIcon name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
