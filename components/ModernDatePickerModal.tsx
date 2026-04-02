import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View as DefaultView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';
import CoreModal from './CoreModal';

interface ModernDatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  currentDateStr?: string; // e.g. "Oct 24"
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ModernDatePickerModal({ visible, onClose, onConfirm, currentDateStr }: ModernDatePickerModalProps) {
  const { themeMode, accentColor, language } = useFinanceStore();
  const themeColors = Colors[themeMode];
  const labels = LABELS[language];

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (visible) {
      if (currentDateStr) {
        // Try to parse "Oct 24" into a Date for the current year
        const currentYear = new Date().getFullYear();
        const parsed = new Date(`${currentDateStr}, ${currentYear}`);
        if (!isNaN(parsed.getTime())) {
          setViewDate(parsed);
          setSelectedDate(parsed);
          return;
        }
      }
      setViewDate(new Date());
      setSelectedDate(new Date());
    }
  }, [visible, currentDateStr]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const startDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const renderDays = () => {
    const columns = [];
    
    // Empty prefix cells
    for (let i = 0; i < startDayOfMonth; i++) {
      columns.push(<DefaultView key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
      const dateObj = new Date(year, month, day);
      const isToday = new Date().toDateString() === dateObj.toDateString();

      columns.push(
        <TouchableOpacity 
          key={`day-${day}`} 
          style={[
            styles.dayCell, 
            isSelected && { backgroundColor: accentColor },
            !isSelected && isToday && { borderWidth: 1, borderColor: accentColor }
          ]}
          onPress={() => {
            const picked = new Date(year, month, day);
            setSelectedDate(picked);
            onConfirm(picked);
          }}
        >
          <Text style={[
            styles.dayText,
            { color: themeColors.text },
            isSelected && { color: accentColor === '#FFFFFF' ? '#000' : '#FFF', fontFamily: 'MartianMono-Bold' },
            !isSelected && isToday && { color: accentColor }
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return columns;
  };

  // Fill to 42 cells (6 weeks) to keep consistent height
  const allColumns = renderDays();
  const totalCells = allColumns.length;
  const paddedColumns = [...allColumns];
  for (let i = totalCells; i < 42; i++) {
      paddedColumns.push(<DefaultView key={`empty-suffix-${i}`} style={styles.dayCell} />);
  }

  return (
    <CoreModal visible={visible} onClose={onClose} title={labels.txDate || 'Date'}>
      <DefaultView style={styles.container}>
        {/* Month Header */}
        <DefaultView style={styles.monthHeader}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.navBtn}>
            <Ionicons name="chevron-back" size={20} color={themeColors.text} />
          </TouchableOpacity>
          <Text style={[styles.monthText, { color: themeColors.text }]}>
            {MONTHS[month]} {year}
          </Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navBtn}>
            <Ionicons name="chevron-forward" size={20} color={themeColors.text} />
          </TouchableOpacity>
        </DefaultView>

        {/* Days of Week */}
        <DefaultView style={styles.weekRow}>
          {DAYS_OF_WEEK.map((d, i) => (
            <DefaultView key={i} style={styles.dayCell}>
              <Text style={[styles.weekText, { color: themeColors.textSecondary }]}>{d}</Text>
            </DefaultView>
          ))}
        </DefaultView>

        {/* Calendar Grid */}
        <DefaultView style={styles.daysGrid}>
          {paddedColumns}
        </DefaultView>

        {/* Quick Actions */}
        <DefaultView style={styles.actions}>
          <TouchableOpacity 
            style={[styles.todayBtn, { backgroundColor: `${accentColor}20` }]}
            onPress={() => {
              const today = new Date();
              setViewDate(today);
              setSelectedDate(today);
              onConfirm(today);
            }}
          >
            <Text style={[styles.todayBtnText, { color: accentColor }]}>Today</Text>
          </TouchableOpacity>
        </DefaultView>
      </DefaultView>
    </CoreModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  monthText: {
    fontFamily: 'MartianMono-Bold',
    fontSize: 16,
  },
  navBtn: {
    padding: 8,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekText: {
    fontFamily: 'MartianMono',
    fontSize: 12,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100 / 7
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  dayText: {
    fontFamily: 'MartianMono',
    fontSize: 13,
  },
  actions: {
    marginTop: 20,
    alignItems: 'center',
  },
  todayBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  todayBtnText: {
    fontFamily: 'MartianMono-Bold',
    fontSize: 14,
  }
});
