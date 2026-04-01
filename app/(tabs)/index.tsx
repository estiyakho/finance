import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import EditTransactionModal from '@/components/EditTransactionModal';
import FinanceSummaryBox from '@/components/FinanceSummaryBox';
import { View } from '@/components/Themed';
import TransactionCard from '@/components/TransactionCard';
import { Transaction, useFinanceStore } from '@/store/useFinanceStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function TransactionsScreen() {
  const {
    transactions,
    currency,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense
  } = useFinanceStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  const handleAddTransaction = () => {
    const newTx: Omit<Transaction, 'id'> = {
      title: 'New Entry',
      amount: 0,
      type: 'expense',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    addTransaction(newTx);
  };

  const handleEditPress = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (id: string, updates: Partial<Transaction>) => {
    updateTransaction(id, updates);
  };

  const confirmDelete = (id: string) => {
    setDeleteTransactionId(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (deleteTransactionId) {
      deleteTransaction(deleteTransactionId);
      setDeleteTransactionId(null);
    }
  };

  const deletingTransactionTitle = useMemo(() => {
    return transactions.find(t => t.id === deleteTransactionId)?.title || '';
  }, [transactions, deleteTransactionId]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.topContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor="#444"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <FinanceSummaryBox
          balance={getTotalBalance()}
          income={getTotalIncome()}
          expense={getTotalExpense()}
          currency={currency}
        />
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditPress(item)} activeOpacity={0.7}>
            <TransactionCard
              {...item}
              currency={currency}
              onDelete={() => confirmDelete(item.id)}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddTransaction}>
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      <EditTransactionModal
        visible={editModalVisible}
        transaction={editingTransaction}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveEdit}
        onDelete={confirmDelete}
      />

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        title={deletingTransactionTitle}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#000',
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    borderWidth: 1,
    borderColor: '#111',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'MartianMono',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
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
