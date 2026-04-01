import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from './Themed';

import { Transaction, useFinanceStore } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';

interface TransactionCardProps extends Transaction {
  currency: string;
  onDelete?: () => void;
}

export default function TransactionCard({ title, amount, type, date, currency, onDelete }: TransactionCardProps) {
  const { themeMode } = useFinanceStore();
  const themeColors = Colors[themeMode];
  
  const amountColor = type === 'income' ? '#4CAF50' : '#FF5252';
  const prefix = type === 'income' ? '+' : '-';

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
          {`${prefix}${currency} ${amount.toLocaleString()}`}
        </Text>
        <TouchableOpacity style={[styles.deleteButton, { backgroundColor: `${themeColors.border}50`, borderColor: themeColors.border }]} onPress={onDelete}>
          <Ionicons name="trash-outline" size={16} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#111',
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
    borderColor: '#333',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 13,
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'MartianMono',
    color: '#666',
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
    backgroundColor: '#1E1414',
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A1A1A',
  },
});
