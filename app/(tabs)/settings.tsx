import React from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore } from '@/store/useFinanceStore';

const CURRENCIES = ['BDT', 'USD', 'EUR', 'GBP', 'INR', 'JPY'];

interface SettingsItem {
  id: string;
  label: string;
  value: string | boolean;
  icon: string;
  type?: string;
  onPress?: () => void;
}

interface SettingsSection {
  title: string;
  data: SettingsItem[];
}

export default function SettingsScreen() {
  const { currency, setCurrency } = useFinanceStore();

  const handleCurrencyChange = () => {
    Alert.alert(
      "Select Currency",
      "Choose your preferred currency",
      CURRENCIES.map(curr => ({
        text: curr,
        onPress: () => setCurrency(curr)
      })),
      { cancelable: true }
    );
  };

  const SETTINGS_SECTIONS: SettingsSection[] = [
    {
      title: 'Appearance',
      data: [
        { id: 'theme', label: 'Theme', value: 'Dark', icon: 'sunny-outline', type: 'text' },
        { id: 'amoled', label: 'AMOLED Theme', type: 'toggle', value: true, icon: 'tablet-portrait-outline' },
        { id: 'accent', label: 'Accent Color', type: 'color', value: '#00AEEF', icon: 'color-palette-outline' },
      ],
    },
    {
      title: 'Preferences',
      data: [
        { id: 'currency', label: 'Currency', value: currency, icon: 'cash-outline', onPress: handleCurrencyChange, type: 'text' },
        { id: 'format', label: 'Time Format', value: '12-Hour', icon: 'time-outline', type: 'text' },
      ],
    },
    {
      title: 'App Preferences',
      data: [
        { id: 'default_screen', label: 'Default Screen', value: 'Transactions', icon: 'layers-outline', type: 'text' },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <SectionList
        sections={SETTINGS_SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.item, { backgroundColor: '#111' }]} 
            onPress={item.onPress}
            disabled={!item.onPress && !item.type}
          >
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#1A1A1A' }]}>
                <Ionicons name={item.icon as any} size={18} color={item.id === 'accent' ? '#00AEEF' : '#666'} />
              </View>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            <View style={styles.itemRight}>
              {item.type === 'toggle' ? (
                <View style={[styles.toggle, { backgroundColor: item.value ? '#FFF' : '#333' }]} />
              ) : item.type === 'color' ? (
                <View style={styles.colorValue}>
                  <View style={[styles.colorDot, { backgroundColor: item.value as string }]} />
                  <Ionicons name="chevron-forward" size={16} color="#444" />
                </View>
              ) : (
                <View style={styles.textValue}>
                  <Text style={styles.itemValue}>{item.value}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#444" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00AEEF',
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemLabel: {
    fontSize: 14,
    color: '#DDD',
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
    fontSize: 13,
    color: '#666',
    marginRight: 4,
  },
  toggle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
  },
  colorValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
});
