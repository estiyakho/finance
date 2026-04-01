import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import TransactionCard from '@/components/TransactionCard';

const MOCK_TRANSACTIONS = [
  { id: '1', title: 'Loan(Ammu)', amount: '1,000.0', type: 'expense', date: 'Apr 1', time: '7:28 AM' },
  { id: '2', title: 'syed', amount: '4,000.0', type: 'income', date: 'Apr 1', time: '7:27 AM' },
  { id: '3', title: 'Fare(Kaptai Raster matha)', amount: '70.0', type: 'expense', date: 'Mar 31', time: '1:55 PM' },
  { id: '4', title: 'Previous month remaining', amount: '265.0', type: 'income', date: 'Mar 31', time: '1:56 PM' },
  { id: '5', title: 'Advance accounting 2', amount: '1,500.0', type: 'expense', date: 'Mar 31', time: '2:00 PM' },
  { id: '6', title: 'Organizational Behaviour', amount: '500.0', type: 'expense', date: 'Mar 31', time: '2:10 PM' },
];

export default function TransactionsScreen() {
  return (
    <View style={[styles.container, { backgroundColor: '#121212' }]}>
      <View style={styles.header}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>BDT 3,195.0</Text>
      </View>

      <FlatList
        data={MOCK_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            title={item.title}
            amount={item.amount}
            type={item.type as 'income' | 'expense'}
            date={item.date}
            time={item.time}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1E1E2E',
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3A',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontWeight: '500',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00AEEF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
