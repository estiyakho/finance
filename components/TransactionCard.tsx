import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { useFinanceStore } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';

interface TransactionCardProps {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  currency: string;
}

export default function TransactionCard({ title, amount, date, type, currency }: TransactionCardProps) {
  const { themeMode, incomeColor, expenseColor } = useFinanceStore();
  const themeColors = Colors[themeMode];
  
  const amountColor = type === 'income' ? incomeColor : expenseColor;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
      <View style={styles.leftSection}>
        <View style={[styles.radioPlaceholder, { borderColor: themeColors.border }]} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.dateText, { color: themeColors.textSecondary }]}>{date}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amount.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    backgroundColor: 'transparent',
  },
  radioPlaceholder: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 13,
    fontFamily: 'MartianMono-Bold',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'MartianMono',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'transparent',
  },
  amount: {
    fontSize: 12,
    fontFamily: 'MartianMono-Bold',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
