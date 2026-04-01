import React, { useState, useEffect } from 'react';
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
  const COLOR_PALETTES = [
    { name: 'Red', hex: '#F44336', shades: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#D50000', '#FF1744'] },
    { name: 'Pink', hex: '#E91E63', shades: ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#C51162', '#F50057'] },
    { name: 'Purple', hex: '#9C27B0', shades: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#AA00FF', '#D500F9'] },
    { name: 'Indigo', hex: '#3F51B5', shades: ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E', '#3D5AFE', '#536DFE'] },
    { name: 'Blue', hex: '#2196F3', shades: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#2979FF', '#2962FF'] },
    { name: 'Cyan', hex: '#00BCD4', shades: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064', '#00E5FF', '#00B8D4'] },
    { name: 'Teal', hex: '#009688', shades: ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40', '#1DE9B6', '#00BFA5'] },
    { name: 'Green', hex: '#4CAF50', shades: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#00E676', '#00C853'] },
    { name: 'Yellow', hex: '#FFEB3B', shades: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF00', '#FFEA00'] },
    { name: 'Orange', hex: '#FF9800', shades: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FF9100', '#FF6D00'] },
    { name: 'Brown', hex: '#795548', shades: ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#251614', '#1F1111'] },
    { name: 'Grey', hex: '#9E9E9E', shades: ['#FFFFFF', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#000000'] }
  ];

  const [activePaletteIndex, setActivePaletteIndex] = useState(0);

  useEffect(() => {
    if (visible && selectedColor) {
      const idx = COLOR_PALETTES.findIndex(p => p.shades.includes(selectedColor.toUpperCase()) || p.hex === selectedColor.toUpperCase());
      if (idx !== -1) setActivePaletteIndex(idx);
    }
  }, [visible, selectedColor]);

  const { themeMode } = useFinanceStore();
  const themeColors = Colors[themeMode];

  return (
    <CoreModal visible={visible} onClose={onClose} title={title}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Base Color</Text>
        <View style={styles.grid}>
          {COLOR_PALETTES.map((palette, index) => (
            <TouchableOpacity
              key={palette.name}
              style={[
                styles.colorCircle,
                { backgroundColor: palette.hex },
                activePaletteIndex === index && { borderColor: palette.hex === '#FFFFFF' ? '#333' : '#FFF', borderWidth: 2 }
              ]}
              onPress={() => setActivePaletteIndex(index)}
            >
              {activePaletteIndex === index && <Ionicons name="checkmark" size={16} color={palette.hex === '#FFFFFF' ? '#000' : '#FFF'} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.paletteDivider, { backgroundColor: themeColors.border }]} />

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Select Shade</Text>
        <View style={styles.grid}>
          {COLOR_PALETTES[activePaletteIndex].shades.map((shade) => (
            <TouchableOpacity
              key={shade}
              style={[
                styles.colorCircle,
                { backgroundColor: shade },
                selectedColor === shade && { borderColor: shade === '#FFFFFF' ? '#333' : '#FFF', borderWidth: 2 }
              ]}
              onPress={() => {
                onSelectColor(shade);
                onClose();
              }}
            >
              {selectedColor === shade && <Ionicons name="radio-button-on" size={18} color={shade === '#FFFFFF' ? '#000' : (shade === '#000000' ? '#FFF' : '#FFF')} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  optionLabel: {
    fontFamily: 'MartianMono',
    fontSize: 16,
    marginLeft: 15,
  },
  sectionTitle: {
    fontFamily: 'MartianMono',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  paletteDivider: {
    height: 1,
    width: '100%',
    marginVertical: 15,
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    margin: 4,
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
