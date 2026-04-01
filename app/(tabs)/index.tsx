import React, { useState, useMemo } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  const insets = useSafeAreaInsets();
  const labels = LABELS[language];
  const themeColors = Colors[themeMode];

  const [searchQuery, setSearchQuery] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'amount') {
        return b.amount - a.amount;
      } else {
        // Default to date/time sort (newest first)
        // Since we store date as strings, we might need to be careful, 
        // but the addTransaction adds them in order.
        return 0; // The store already keeps them in descending order of addition
      }
    });

    return result;
  }, [transactions, searchQuery, filterType, sortBy]);

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

  const toggleSort = () => {
    setSortBy(prev => prev === 'date' ? 'amount' : 'date');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      <StatusBar 
        barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor="transparent"
        translucent={true}
      />
      
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

            <View style={styles.filterSortRow}>
              <View style={[styles.chipsContainer, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                {(['all', 'income', 'expense'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.chip,
                      filterType === type && { backgroundColor: accentColor }
                    ]}
                    onPress={() => setFilterType(type)}
                  >
                    <Text 
                      style={[
                        styles.chipText, 
                        { color: filterType === type ? '#FFF' : themeColors.textSecondary }
                      ]}
                    >
                      {labels[type]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={[styles.sortButton, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
                onPress={toggleSort}
              >
                <Ionicons name="swap-vertical" size={16} color={themeColors.textSecondary} />
                <Text style={[styles.sortButtonText, { color: themeColors.textSecondary }]}>{labels.sort}</Text>
              </TouchableOpacity>
            </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 18,
    marginTop: 8,
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
  filterSortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  chipsContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 11,
    fontFamily: 'MartianMono-Bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  sortButtonText: {
    fontSize: 11,
    fontFamily: 'MartianMono-Bold',
    marginLeft: 6,
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
