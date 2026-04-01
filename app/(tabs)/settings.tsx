import React from 'react';
import { StyleSheet, SectionList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const SETTINGS_SECTIONS = [
  {
    title: 'Appearance',
    data: [
      { id: 'theme', label: 'Theme', value: 'Dark', icon: 'sunny-outline' },
      { id: 'amoled', label: 'AMOLED Theme', type: 'toggle', value: true, icon: 'tablet-portrait-outline' },
      { id: 'accent', label: 'Accent Color', type: 'color', value: '#00AEEF', icon: 'color-palette-outline' },
    ],
  },
  {
    title: 'Date & Time',
    data: [
      { id: 'format', label: 'Time Format', value: '12-Hour', icon: 'time-outline' },
      { id: 'start_day', label: 'First Day of the Week', value: 'Saturday', icon: 'calendar-outline' },
      { id: 'snooze', label: 'Snooze Duration', value: '10 min', icon: 'alarm-outline' },
    ],
  },
  {
    title: 'App Preferences',
    data: [
      { id: 'default_screen', label: 'Default Screen', value: 'All Transactions', icon: 'layers-outline' },
    ],
  },
];

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: '#121212' }]}>
      <SectionList
        sections={SETTINGS_SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: '#1E1E1E' }]}>
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#252525' }]}>
                <Ionicons name={item.icon as any} size={20} color={item.id === 'accent' ? '#00AEEF' : '#888'} />
              </View>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            <View style={styles.itemRight}>
              {item.type === 'toggle' ? (
                <View style={[styles.toggle, { backgroundColor: item.value ? '#FFF' : '#333' }]} />
              ) : item.type === 'color' ? (
                <View style={styles.colorValue}>
                  <View style={[styles.colorDot, { backgroundColor: item.value as string }]} />
                  <Ionicons name="chevron-forward" size={18} color="#888" />
                </View>
              ) : (
                <View style={styles.textValue}>
                  <Text style={styles.itemValue}>{item.value}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#888" />
                </View>
              )}
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00AEEF',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#888',
    marginRight: 4,
  },
  toggle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#444',
  },
  colorValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
});
