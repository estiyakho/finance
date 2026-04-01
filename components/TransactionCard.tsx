import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Transaction } from '@/store/useFinanceStore';

interface TransactionCardProps extends Transaction {
  onDelete?: () => void;
  currency: string;
}

export default function TransactionCard({ title, amount, type, date, time, onDelete, currency }: TransactionCardProps) {
  const isExpense = type === 'expense';
  const amountColor = isExpense ? '#FF5252' : '#4CAF50';
  const prefix = isExpense ? '-' : '';

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.radioPlaceholder} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={10} color="#666" style={styles.timeIcon} />
            <Text style={styles.timeText}>{`${date}, ${time}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {`${prefix}${currency} ${amount.toLocaleString()}`}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={14} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioPlaceholder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#333',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EEE',
    marginBottom: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 10,
    color: '#666',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amount: {
    fontSize: 13,
    fontWeight: '700',
  },
  deleteButton: {
    padding: 4,
  },
});
