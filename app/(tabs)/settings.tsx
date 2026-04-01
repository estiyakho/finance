import React, { useState } from 'react';
import { StyleSheet, SectionList, TouchableOpacity, Switch, View as DefaultView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS, ThemeMode } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';
import { 
  CurrencyPickerModal, 
  ColorPickerModal, 
  LanguagePickerModal, 
  ResetConfirmationModal 
} from '@/components/PickerModals';

interface SettingsItem {
  id: string;
  label: string;
  value?: string | boolean;
  icon: string;
  type?: 'text' | 'toggle' | 'color' | 'danger' | 'choice';
  onPress?: () => void;
}

interface SettingsSection {
  title: string;
  data: SettingsItem[];
}

export default function SettingsScreen() {
  const { 
    currency, 
    themeMode, 
    setThemeMode, 
    accentColor, 
    language,
  } = useFinanceStore();

  const labels = LABELS[language];

  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [colorVisible, setColorVisible] = useState(false);
  const [langVisible, setLangVisible] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);

  const themeColors = Colors[themeMode];

  const handleThemeChange = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'amoled'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const SETTINGS_SECTIONS: SettingsSection[] = [
    {
      title: labels.appearance,
      data: [
        { id: 'theme', label: labels.theme, value: themeMode.toUpperCase(), icon: 'sunny-outline', type: 'choice', onPress: handleThemeChange },
        { id: 'accent', label: labels.accent, type: 'color', value: accentColor, icon: 'color-palette-outline', onPress: () => setColorVisible(true) },
      ],
    },
    {
      title: labels.preferences,
      data: [
        { id: 'language', label: labels.language, value: language === 'en' ? 'English' : 'বাংলা', icon: 'language-outline', type: 'choice', onPress: () => setLangVisible(true) },
        { id: 'currency', label: labels.currency, value: currency, icon: 'cash-outline', type: 'choice', onPress: () => setCurrencyVisible(true) },
      ],
    },
    {
      title: labels.dataPrivacy,
      data: [
        { id: 'reset', label: labels.resetData, type: 'danger', icon: 'refresh-outline', onPress: () => setResetVisible(true) },
        { id: 'reset', label: labels.resetData, type: 'danger', icon: 'trash-outline', onPress: () => setResetVisible(true) },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: accentColor }]}>{labels.settings}</Text>
      </View>

      <SectionList
        sections={SETTINGS_SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.item, { backgroundColor: themeColors.card, borderColor: themeColors.border }]} 
            onPress={item.onPress}
            activeOpacity={0.7}
            disabled={!item.onPress}
          >
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: item.type === 'danger' ? '#1E1414' : themeColors.backgroundSecondary }]}>
                <Ionicons 
                  name={item.icon as any} 
                  size={18} 
                  color={item.type === 'danger' ? '#FF5252' : item.type === 'color' ? accentColor : themeColors.textSecondary} 
                />
              </View>
              <Text style={[styles.itemLabel, { color: themeColors.text }, item.type === 'danger' && styles.dangerText]}>
                {item.label}
              </Text>
            </View>

            <View style={styles.itemRight}>
              {item.type === 'color' ? (
                <View style={styles.valueWrapper}>
                  <View style={[styles.colorDot, { backgroundColor: item.value as string }]} />
                  <Ionicons name="chevron-forward" size={14} color={themeColors.border} />
                </View>
              ) : item.type === 'danger' ? (
                <Ionicons name="chevron-forward" size={14} color={themeColors.border} />
              ) : (
                <View style={styles.valueWrapper}>
                  <Text style={[styles.itemValue, { color: themeColors.textSecondary }]}>{item.value}</Text>
                  <Ionicons name="chevron-forward" size={14} color={themeColors.border} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader, { color: themeColors.textSecondary }]}>{title}</Text>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <CurrencyPickerModal visible={currencyVisible} onClose={() => setCurrencyVisible(false)} />
      <ColorPickerModal visible={colorVisible} onClose={() => setColorVisible(false)} />
      <LanguagePickerModal visible={langVisible} onClose={() => setLangVisible(false)} />
      <ResetConfirmationModal visible={resetVisible} onClose={() => setResetVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'MartianMono-Bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: 'MartianMono-Bold',
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
  },
  dangerText: {
    color: '#FF5252',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  itemValue: {
    fontSize: 11,
    fontFamily: 'MartianMono',
    marginRight: 6,
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
