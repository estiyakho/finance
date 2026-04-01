import React from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Alert, Switch, View as DefaultView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore } from '@/store/useFinanceStore';

const CURRENCIES = ['BDT', 'USD', 'EUR', 'GBP', 'INR', 'JPY'];
const ACCENTS = ['#00AEEF', '#FF5252', '#4CAF50', '#FFD700', '#FF00FF', '#FFFFFF'];

interface SettingsItem {
  id: string;
  label: string;
  value?: string | boolean;
  icon: string;
  type?: 'text' | 'toggle' | 'color' | 'danger';
  onPress?: () => void;
}

interface SettingsSection {
  title: string;
  data: SettingsItem[];
}

export default function SettingsScreen() {
  const { 
    currency, 
    setCurrency, 
    isAmoled, 
    setAmoled, 
    accentColor, 
    setAccentColor,
    resetData 
  } = useFinanceStore();

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

  const handleAccentChange = () => {
    Alert.alert(
      "Accent Color",
      "Choose a theme accent",
      ACCENTS.map(color => ({
        text: color === accentColor ? `• ${color}` : color,
        onPress: () => setAccentColor(color)
      })),
      { cancelable: true }
    );
  };

  const handleReset = () => {
    Alert.alert(
      "Reset All Data",
      "This will permanently delete all transactions and settings. proceed?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: resetData }
      ]
    );
  };

  const SETTINGS_SECTIONS: SettingsSection[] = [
    {
      title: 'Appearance',
      data: [
        { id: 'amoled', label: 'AMOLED Mode', type: 'toggle', value: isAmoled, icon: 'moon-outline' },
        { id: 'accent', label: 'Accent Color', type: 'color', value: accentColor, icon: 'color-palette-outline', onPress: handleAccentChange },
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
      title: 'Data & Privacy',
      data: [
        { id: 'reset', label: 'Reset All Data', type: 'danger', icon: 'refresh-outline', onPress: handleReset },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: accentColor }]}>Settings</Text>
      </View>

      <SectionList
        sections={SETTINGS_SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.item, { backgroundColor: '#0A0A0A' }]} 
            onPress={item.onPress}
            disabled={item.type === 'toggle'}
            activeOpacity={0.7}
          >
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: item.type === 'danger' ? '#1E1414' : '#111' }]}>
                <Ionicons 
                  name={item.icon as any} 
                  size={18} 
                  color={item.type === 'danger' ? '#FF5252' : item.type === 'color' ? accentColor : '#666'} 
                />
              </View>
              <Text style={[styles.itemLabel, item.type === 'danger' && styles.dangerText]}>
                {item.label}
              </Text>
            </View>

            <View style={styles.itemRight}>
              {item.type === 'toggle' ? (
                <Switch
                  value={item.value as boolean}
                  onValueChange={setAmoled}
                  trackColor={{ false: '#333', true: accentColor }}
                  thumbColor="#FFF"
                />
              ) : item.type === 'color' ? (
                <View style={styles.colorValue}>
                  <View style={[styles.colorDot, { backgroundColor: item.value as string }]} />
                  <Ionicons name="chevron-forward" size={14} color="#333" />
                </View>
              ) : item.type === 'danger' ? (
                <Ionicons name="chevron-forward" size={14} color="#333" />
              ) : (
                <View style={styles.textValue}>
                  <Text style={styles.itemValue}>{item.value}</Text>
                  <Ionicons name="chevron-forward" size={14} color="#333" />
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'MartianMono-Bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: 'MartianMono-Bold',
    color: '#444',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#111',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  itemLabel: {
    fontSize: 14,
    fontFamily: 'MartianMono',
    color: '#EEE',
  },
  dangerText: {
    color: '#FF5252',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textValue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  itemValue: {
    fontSize: 12,
    fontFamily: 'MartianMono',
    color: '#666',
    marginRight: 6,
  },
  colorValue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
});
