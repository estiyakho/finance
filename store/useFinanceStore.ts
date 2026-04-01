import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setCurrency: (currency: string) => void;
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [
        { id: '1', title: 'Loan(Ammu)', amount: 1000.0, type: 'expense', date: 'Apr 1', time: '7:28 AM' },
        { id: '2', title: 'syed', amount: 4000.0, type: 'income', date: 'Apr 1', time: '7:27 AM' },
        { id: '3', title: 'Fare(Kaptai Raster matha)', amount: 70.0, type: 'expense', date: 'Mar 31', time: '1:55 PM' },
        { id: '4', title: 'Previous month remaining', amount: 265.0, type: 'income', date: 'Mar 31', time: '1:56 PM' },
      ],
      currency: 'BDT',
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Math.random().toString(36).substring(7) },
          ...state.transactions
        ]
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
      setCurrency: (currency) => set({ currency }),
      getTotalBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
      },
      getTotalIncome: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : 0), 0);
      },
      getTotalExpense: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => acc + (t.type === 'expense' ? t.amount : 0), 0);
      },
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
