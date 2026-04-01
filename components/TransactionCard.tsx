import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransactionCardProps {
  title: string;
  amount: string;
  type: 'income' | 'expense';
  date: string;
  time: string;
  onDelete?: () => void;
}

export default function TransactionCard({ title, amount, type, date, time, onDelete }: TransactionCardProps) {
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
            <Ionicons name="time-outline" size={12} color="#888" style={styles.timeIcon} />
            <Text style={styles.timeText}>{`${date}, ${time}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: amountColor }]}>
            {`${prefix}BDT${amount}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={18} color="#FF5252" />
        </TouchableOpacity>
        <View style={styles.naBadge}>
          <Text style={styles.naText}>N/A</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  rightSection: {
    alignItems: 'flex-end',
    minWidth: 100,
  },
  amountContainer: {
    marginBottom: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#2A1A1A',
    padding: 6,
    borderRadius: 8,
    marginBottom: 4,
  },
  naBadge: {
    backgroundColor: '#252525',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  naText: {
    fontSize: 10,
    color: '#888',
    fontWeight: 'bold',
  },
});
