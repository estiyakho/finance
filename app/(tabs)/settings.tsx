import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Sun, Smartphone, Palette, Clock, Calendar, Bell, Layers } from 'lucide-react-native';
import SettingRow from '@/components/SettingRow';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [isAmoled, setIsAmoled] = useState(true);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Appearance</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <SettingRow icon={Sun} label="Theme" value="Dark" />
        <SettingRow 
          icon={Smartphone} 
          label="AMOLED Theme" 
          type="switch" 
          isEnabled={isAmoled} 
          onPress={() => setIsAmoled(!isAmoled)} 
        />
        <SettingRow icon={Palette} label="Accent Color" isLast={true} />
      </View>

      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Date & Time</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <SettingRow icon={Clock} label="Time Format" value="12-Hour" />
        <SettingRow icon={Calendar} label="First Day of the Week" value="Saturday" />
        <SettingRow icon={Bell} label="Snooze Duration" value="10 min" isLast={true} />
      </View>

      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>App Preferences</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <SettingRow icon={Layers} label="Default Screen" value="Overview" isLast={true} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    // Apply a subtle border as seen in some professional AMOLED designs
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
});
