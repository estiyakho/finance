import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  time: string;
}

interface FinanceState {
  transactions: Transaction[];
  currency: string;
  isAmoled: boolean;
  accentColor: string;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  setCurrency: (currency: string) => void;
  setAmoled: (isAmoled: boolean) => void;
  setAccentColor: (color: string) => void;
  resetData: () => void;
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      currency: 'BDT',
      isAmoled: true,
      accentColor: '#00AEEF',
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Math.random().toString(36).substring(7) },
          ...state.transactions
        ]
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map((t) => t.id === id ? { ...t, ...updates } : t)
      })),
      setCurrency: (currency) => set({ currency }),
      setAmoled: (isAmoled) => set({ isAmoled }),
      setAccentColor: (accentColor) => set({ accentColor }),
      resetData: () => set({ transactions: [], currency: 'BDT', isAmoled: true, accentColor: '#00AEEF' }),
      getTotalBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc: number, t: Transaction) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
      },
      getTotalIncome: () => {
        const { transactions } = get();
        return transactions.reduce((acc: number, t: Transaction) => acc + (t.type === 'income' ? t.amount : 0), 0);
      },
      getTotalExpense: () => {
        const { transactions } = get();
        return transactions.reduce((acc: number, t: Transaction) => acc + (t.type === 'expense' ? t.amount : 0), 0);
      },
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
