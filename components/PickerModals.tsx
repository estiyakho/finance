import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View as DefaultView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS, ThemeMode } from '@/store/useFinanceStore';
import CoreModal from './CoreModal';

interface PickerProps {
  visible: boolean;
  onClose: () => void;
}

export function CurrencyPickerModal({ visible, onClose }: PickerProps) {
  const { currency, setCurrency, language, accentColor } = useFinanceStore();
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
            <Text style={[styles.gridText, currency === curr && { color: accentColor }]}>{curr}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </CoreModal>
  );
}

export function LanguagePickerModal({ visible, onClose }: PickerProps) {
  const { language, setLanguage, accentColor } = useFinanceStore();
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
              <Text style={[styles.listText, language === opt.code && { color: accentColor }]}>{opt.label}</Text>
              <Text style={styles.listSubText}>{opt.sub}</Text>
            </DefaultView>
            {language === opt.code && <Ionicons name="checkmark" size={20} color={accentColor} />}
          </TouchableOpacity>
        ))}
      </DefaultView>
    </CoreModal>
  );
}

export function ColorPickerModal({ visible, onClose }: PickerProps) {
  const { accentColor, setAccentColor, language } = useFinanceStore();
  const colors = ['#00AEEF', '#FF5252', '#4CAF50', '#FFD700', '#FF00FF', '#FFFFFF', '#FF8C00', '#00FF7F'];
  const labels = LABELS[language];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.accent}>
      <View style={styles.grid}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              accentColor === color && { borderColor: '#FFF', borderWidth: 2 }
            ]}
            onPress={() => {
              setAccentColor(color);
              onClose();
            }}
          >
            {accentColor === color && <Ionicons name="checkmark" size={16} color={color === '#FFFFFF' ? '#000' : '#FFF'} />}
          </TouchableOpacity>
        ))}
      </View>
    </CoreModal>
  );
}

export function ThemePickerModal({ visible, onClose }: PickerProps) {
  const { themeMode, setThemeMode, language, accentColor } = useFinanceStore();
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
              themeMode === opt.code && { backgroundColor: `${accentColor}10` }
            ]}
            onPress={() => {
              setThemeMode(opt.code);
              onClose();
            }}
          >
            <DefaultView style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons 
                name={opt.icon as any} 
                size={20} 
                color={themeMode === opt.code ? accentColor : '#888'} 
                style={{ marginRight: 12 }} 
              />
              <Text style={[styles.listText, themeMode === opt.code && { color: accentColor }]}>{opt.label}</Text>
            </DefaultView>
            {themeMode === opt.code && <Ionicons name="checkmark" size={20} color={accentColor} />}
          </TouchableOpacity>
        ))}
      </DefaultView>
    </CoreModal>
  );
}

export function ResetConfirmationModal({ visible, onClose }: PickerProps) {
  const { resetData, language, accentColor } = useFinanceStore();
  const labels = LABELS[language];

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.resetData}>
      <DefaultView style={styles.confirmBody}>
        <DefaultView style={styles.warningIcon}>
          <Ionicons name="warning-outline" size={40} color="#FF5252" />
        </DefaultView>
        <Text style={styles.confirmText}>{labels.confirmDelete}</Text>
        <DefaultView style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>{labels.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.confirmBtn, { backgroundColor: '#FF5252' }]} 
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
