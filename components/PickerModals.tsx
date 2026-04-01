import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View as DefaultView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS, ThemeMode } from '@/store/useFinanceStore';
import CoreModal from './CoreModal';
import Colors from '@/constants/Colors';

interface PickerProps {
  visible: boolean;
  onClose: () => void;
}

export function CurrencyPickerModal({ visible, onClose }: PickerProps) {
  const { currency, setCurrency, language, accentColor, themeMode } = useFinanceStore();
  const currencies = ['BDT', 'USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];
  const labels = LABELS[language];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.currency}>
      <View style={styles.grid}>
        {currencies.map((curr) => (
          <TouchableOpacity
            key={curr}
            style={[
              styles.gridItem,
              currency === curr && { borderColor: accentColor, backgroundColor: `${accentColor}10` }
            ]}
            onPress={() => {
              setCurrency(curr);
              onClose();
            }}
          >
            <Text style={[styles.gridText, { color: Colors[themeMode].textSecondary }, currency === curr && { color: accentColor }]}>{curr}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </CoreModal>
  );
}

export function LanguagePickerModal({ visible, onClose }: PickerProps) {
  const { language, setLanguage, accentColor, themeMode } = useFinanceStore();
  const labels = LABELS[language];
  const options = [
    { code: 'en', label: 'English', sub: 'English' },
    { code: 'bn', label: 'বাংলা', sub: 'Bangla' },
  ];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.language}>
      <DefaultView style={styles.list}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.code}
            style={[
              styles.listItem,
              language === opt.code && { backgroundColor: `${accentColor}10` }
            ]}
            onPress={() => {
              setLanguage(opt.code as any);
              onClose();
            }}
          >
            <DefaultView>
              <Text style={[styles.listText, { color: Colors[themeMode].text }, language === opt.code && { color: accentColor }]}>{opt.label}</Text>
              <Text style={[styles.listSubText, { color: Colors[themeMode].textSecondary }]}>{opt.sub}</Text>
            </DefaultView>
            {language === opt.code && <Ionicons name="checkmark" size={20} color={accentColor} />}
          </TouchableOpacity>
        ))}
      </DefaultView>
    </CoreModal>
  );
}

export function GenericColorPickerModal({ 
  visible, onClose, title, selectedColor, onSelectColor 
}: PickerProps & { title: string, selectedColor: string, onSelectColor: (c: string) => void }) {
  const colors = [
    // Bright & Primary (Row 1-2)
    '#00AEEF', '#FF5252', '#4CAF50', '#FFD700', '#FF00FF', 
    '#FFFFFF', '#FF8C00', '#00FF7F', '#9C27B0', '#00BCD4',
    // Neons & AMOLED accents (Row 3-4)
    '#00E5FF', '#1DE9B6', '#B2FF59', '#EEFF41', '#FF4081', 
    '#E040FB', '#7C4DFF', '#536DFE', '#FFAB40', '#FF6E40',
    // Pastels & Soft Tones (Row 5-6)
    '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', 
    '#81D4FA', '#80CBC4', '#A5D6A7', '#E6EE9C', '#FFF59D',
    // Deep & Earth (Row 7-8)
    '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', 
    '#039BE5', '#00897B', '#43A047', '#7CB342', '#C0CA33',
    '#FDD835', '#FFB300', '#FB8C00', '#F4511E', '#6D4C41',
    '#757575', '#546E7A', '#F50057', '#00E676', '#D50000'
  ];

  return (
    <CoreModal visible={visible} onClose={onClose} title={title}>
      <ScrollView style={{ maxHeight: 300 }} fadingEdgeLength={20} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && { borderColor: color === '#FFFFFF' ? '#333' : '#FFF', borderWidth: 2 }
              ]}
              onPress={() => {
                onSelectColor(color);
                onClose();
              }}
            >
              {selectedColor === color && <Ionicons name="checkmark" size={16} color={color === '#FFFFFF' ? '#000' : '#FFF'} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </CoreModal>
  );
}

export function AccentColorPickerModal(props: PickerProps) {
  const { accentColor, setAccentColor, language } = useFinanceStore();
  const labels = LABELS[language];
  return <GenericColorPickerModal {...props} title={labels.accent} selectedColor={accentColor} onSelectColor={setAccentColor} />;
}

export function IncomeColorPickerModal(props: PickerProps) {
  const { incomeColor, setIncomeColor, language } = useFinanceStore();
  const labels = LABELS[language];
  return <GenericColorPickerModal {...props} title={labels.incomeColor} selectedColor={incomeColor} onSelectColor={setIncomeColor} />;
}

export function ExpenseColorPickerModal(props: PickerProps) {
  const { expenseColor, setExpenseColor, language } = useFinanceStore();
  const labels = LABELS[language];
  return <GenericColorPickerModal {...props} title={labels.expenseColor} selectedColor={expenseColor} onSelectColor={setExpenseColor} />;
}

export function ThemePickerModal({ visible, onClose }: PickerProps) {
  const { themeMode: currentThemeMode, setThemeMode, language, accentColor } = useFinanceStore();
  const labels = LABELS[language];
  const options: { code: ThemeMode; label: string; icon: string }[] = [
    { code: 'light', label: labels.light, icon: 'sunny-outline' },
    { code: 'dark', label: labels.dark, icon: 'moon-outline' },
    { code: 'amoled', label: labels.amoled, icon: 'contrast-outline' },
  ];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.theme}>
      <DefaultView style={styles.list}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.code}
            style={[
              styles.listItem,
              { borderColor: Colors[currentThemeMode].border },
              currentThemeMode === opt.code && { backgroundColor: `${accentColor}10` }
            ]}
            onPress={() => {
              setThemeMode(opt.code);
              onClose();
            }}
          >
            <DefaultView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Ionicons 
                name={opt.icon as any} 
                size={20} 
                color={currentThemeMode === opt.code ? accentColor : Colors[currentThemeMode].textSecondary} 
                style={{ marginRight: 12 }} 
              />
              <Text style={[styles.listText, { color: Colors[currentThemeMode].text }, currentThemeMode === opt.code && { color: accentColor }]}>{opt.label}</Text>
            </DefaultView>
            {currentThemeMode === opt.code && <Ionicons name="checkmark" size={20} color={accentColor} />}
          </TouchableOpacity>
        ))}
      </DefaultView>
    </CoreModal>
  );
}

export function ResetConfirmationModal({ visible, onClose }: PickerProps) {
  const { resetData, language, accentColor, themeMode, expenseColor } = useFinanceStore();
  const labels = LABELS[language];
  const themeColors = Colors[themeMode];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.resetData}>
      <DefaultView style={styles.confirmBody}>
        <DefaultView style={[styles.warningIcon, { backgroundColor: `${expenseColor}20`, borderColor: `${expenseColor}40` }]}>
          <Ionicons name="warning-outline" size={40} color={expenseColor} />
        </DefaultView>
        <Text style={[styles.confirmText, { color: themeColors.text }]}>{labels.confirmDelete}</Text>
        <DefaultView style={styles.actions}>
          <TouchableOpacity 
            style={[styles.cancelBtn, { backgroundColor: themeColors.card, borderColor: themeColors.border }]} 
            onPress={onClose}
          >
            <Text style={[styles.cancelBtnText, { color: themeColors.textSecondary }]}>{labels.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.confirmBtn, { backgroundColor: expenseColor }]} 
            onPress={() => {
              resetData();
              onClose();
            }}
          >
            <Text style={styles.confirmBtnText}>{labels.resetData}</Text>
          </TouchableOpacity>
        </DefaultView>
      </DefaultView>
    </CoreModal>
  );
}

export function SortPickerModal({ 
  visible, 
  onClose, 
  value, 
  onSelect 
}: PickerProps & { value: string, onSelect: (val: any) => void }) {
  const { language, accentColor } = useFinanceStore();
  const labels = LABELS[language];

  const options = [
    { code: 'newest', label: labels.newest, icon: 'time-outline' },
    { code: 'oldest', label: labels.oldest, icon: 'hourglass-outline' },
    { code: 'az', label: labels.az, icon: 'text-outline' },
    { code: 'za', label: labels.za, icon: 'text-outline' },
  ];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.sort}>
      <DefaultView style={styles.list}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.code}
            style={[
              styles.listItem,
              value === opt.code && { backgroundColor: `${accentColor}10` }
            ]}
            onPress={() => {
              onSelect(opt.code);
              onClose();
            }}
          >
            <DefaultView style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons 
                name={opt.icon as any} 
                size={20} 
                color={value === opt.code ? accentColor : '#888'} 
                style={{ marginRight: 12 }} 
              />
              <Text style={[styles.listText, value === opt.code && { color: accentColor }]}>{opt.label}</Text>
            </DefaultView>
            {value === opt.code && <Ionicons name="checkmark" size={20} color={accentColor} />}
          </TouchableOpacity>
        ))}
      </DefaultView>
    </CoreModal>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  gridItem: {
    width: '45%',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  gridText: {
    fontFamily: 'MartianMono-Bold',
    fontSize: 14,
    color: '#FFF',
  },
  list: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  listText: {
    fontFamily: 'MartianMono-Bold',
    fontSize: 14,
    color: '#FFF',
  },
  listSubText: {
    fontFamily: 'MartianMono',
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBody: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  warningIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A1A1A',
  },
  confirmText: {
    fontFamily: 'MartianMono',
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontFamily: 'MartianMono-Bold',
    color: '#666',
    fontSize: 13,
  },
  confirmBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
    fontSize: 13,
  },
});
