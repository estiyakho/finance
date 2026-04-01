import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import TransactionCard from '@/components/TransactionCard';
import FinanceSummaryBox from '@/components/FinanceSummaryBox';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function TransactionsScreen() {
  const { 
    transactions, 
    currency, 
    addTransaction, 
    deleteTransaction,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense
  } = useFinanceStore();

  const handleAddTransaction = () => {
    // For now, we'll add a mock transaction to demonstrate functionality
    // In a real app, this would open a modal with a form
    addTransaction({
      title: 'New Transaction',
      amount: Math.floor(Math.random() * 1000) + 50,
      type: Math.random() > 0.5 ? 'income' : 'expense',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    });
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to delete "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.header}>
        <FinanceSummaryBox 
          balance={getTotalBalance()}
          income={getTotalIncome()}
          expense={getTotalExpense()}
          currency={currency}
        />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            {...item}
            currency={currency}
            onDelete={() => handleDelete(item.id, item.title)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddTransaction}>
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
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
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
