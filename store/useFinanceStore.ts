import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Custom storage wrapper to handle 'Native module is null' error gracefully
const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (e) {
      if (Platform.OS === 'web') {
        return localStorage.getItem(name);
      }
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      if (Platform.OS === 'web') {
        localStorage.setItem(name, value);
      }
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      if (Platform.OS === 'web') {
        localStorage.removeItem(name);
      }
    }
  },
};

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  time: string;
  createdAt: number;
}

export type ThemeMode = 'light' | 'dark' | 'amoled';
export type Language = 'en' | 'bn';

export const LABELS: Record<Language, any> = {
  en: {
    home: 'Home',
    stats: 'Stats',
    settings: 'Settings',
    balance: 'Total Balance',
    income: 'Income',
    expense: 'Expense',
    search: 'Search transactions...',
    newEntry: 'New Entry',
    editTx: 'Edit Transaction',
    deleteTx: 'Delete Transaction',
    confirmDelete: 'Are you sure you want to delete this?',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    theme: 'Theme Mode',
    language: 'Language',
    currency: 'Currency',
    resetData: 'Reset All',
    appearance: 'Appearance',
    preferences: 'Preferences',
    dataPrivacy: 'Data & Privacy',
    amoled: 'AMOLED Mode',
    accent: 'Accent Color',
    light: 'Light',
    dark: 'Dark',
    all: 'All',
    sort: 'Sort',
    newest: 'Newest First',
    oldest: 'Oldest First',
    az: 'A to Z',
    za: 'Z to A',
    incomeColor: 'Income Color',
    expenseColor: 'Expense Color',
  },
  bn: {
    home: 'হোম',
    stats: 'পরিসংখ্যান',
    settings: 'সেটিংস',
    balance: 'মোট ব্যালেন্স',
    income: 'আয়',
    expense: 'ব্যয়',
    search: 'লেনদেন খুঁজুন...',
    newEntry: 'নতুন এন্ট্রি',
    editTx: 'লেনদেন সম্পাদনা',
    deleteTx: 'লেনদেন মুছুন',
    confirmDelete: 'আপনি কি এটি মুছতে নিশ্চিত?',
    cancel: 'বাতিল',
    save: 'নিশ্চিত করুন',
    delete: 'মুছুন',
    theme: 'থিম মোড',
    language: 'ভাষা',
    currency: 'মুদ্রা',
    resetData: 'সব মুছে ফেলুন', // "Reset All" translated to Bangla, simplified from "সব ডেটা মুছে ফেলুন"
    appearance: 'চেহারা',
    preferences: 'পছন্দসমূহ',
    dataPrivacy: 'ডেটা এবং গোপনীয়তা',
    amoled: 'অ্যামোলেড মোড',
    accent: 'অ্যাকসেন্ট কালার',
    light: 'লাইট',
    dark: 'ডার্ক',
    all: 'সব',
    sort: 'সর্ট',
    newest: 'নতুনগুলো আগে',
    oldest: 'পুরানো গুলো আগে',
    az: 'এ থেকে জেড',
    za: 'জেড থেকে এ',
    incomeColor: 'আয়ের রঙ',
    expenseColor: 'ব্যয়ের রঙ',
  }
};

interface FinanceState {
  transactions: Transaction[];
  currency: string;
  themeMode: ThemeMode;
  accentColor: string;
  incomeColor: string;
  expenseColor: string;
  language: Language;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  setCurrency: (currency: string) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setIncomeColor: (color: string) => void;
  setExpenseColor: (color: string) => void;
  setLanguage: (lang: Language) => void;
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
      themeMode: 'amoled',
      accentColor: '#00AEEF',
      incomeColor: '#4CAF50',
      expenseColor: '#FF5252',
      language: 'en',
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Math.random().toString(36).substring(7), createdAt: Date.now() },
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
      setThemeMode: (themeMode) => set({ themeMode }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setIncomeColor: (incomeColor) => set({ incomeColor }),
      setExpenseColor: (expenseColor) => set({ expenseColor }),
      setLanguage: (language) => set({ language }),
      resetData: () => set({ transactions: [], currency: 'BDT', themeMode: 'amoled', accentColor: '#00AEEF', incomeColor: '#4CAF50', expenseColor: '#FF5252', language: 'en' }),
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
      storage: createJSONStorage(() => customStorage),
    }
  )
);
