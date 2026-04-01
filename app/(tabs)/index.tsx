import React, { useState, useMemo } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import TransactionCard from '@/components/TransactionCard';
import FinanceSummaryBox from '@/components/FinanceSummaryBox';
import EditTransactionModal from '@/components/EditTransactionModal';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { useFinanceStore, Transaction, LABELS } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';

export default function TransactionsScreen() {
  const { 
    transactions, 
    currency, 
    addTransaction, 
    deleteTransaction,
    updateTransaction,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
    accentColor,
    themeMode,
    language
  } = useFinanceStore();

  const labels = LABELS[language];
  const themeColors = Colors[themeMode];

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
    setEditingTransaction({
      id: '', // Blank ID signals 'Add Mode' to the modal
      title: '',
      amount: 0,
      type: 'expense',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    });
    setEditModalVisible(true);
  };

  const handleEditPress = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (id: string | null, updates: Partial<Transaction>) => {
    if (id) {
      updateTransaction(id, updates);
    } else {
      addTransaction(updates as Omit<Transaction, 'id'>);
    }
    setEditModalVisible(false);
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
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'} />
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
        ListHeaderComponent={
          <View style={[styles.header, { backgroundColor: 'transparent' }]}>
            <View style={[styles.searchContainer, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
              <Ionicons name="search" size={18} color={themeColors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { color: themeColors.text }]}
                placeholder={labels.search}
                placeholderTextColor={themeColors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery !== '' && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color={themeColors.textSecondary} />
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
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: accentColor }]} onPress={handleAddTransaction}>
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 18,
    marginTop: Platform.OS === 'ios' ? 20 : 40,
    marginBottom: 20,
    height: 54,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
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
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
