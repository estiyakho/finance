import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TrendingUp, TrendingDown, Coffee, ShoppingBag, CreditCard, Apple } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const ICON_MAP = {
  coffee: Coffee,
  shopping: ShoppingBag,
  card: CreditCard,
  entertainment: Apple,
  income: TrendingUp,
  expense: TrendingDown,
};

interface TransactionProps {
  title?: string;
  amount?: string;
  category?: string;
  icon?: keyof typeof ICON_MAP;
  date?: string;
}

export default function TransactionListItem({ 
  title = "Coffee", 
  amount = "-4.50", 
  category = "Food & Drink", 
  icon = "coffee",
  date = "Today, 10:45 AM"
}: TransactionProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const isIncome = !amount.startsWith('-');
  const Icon = ICON_MAP[icon] || ShoppingBag;

  return (
    <Pressable style={({ pressed }) => [styles.container, { backgroundColor: theme.card, opacity: pressed ? 0.7 : 1 }]}>
      <View style={[styles.iconBox, { backgroundColor: isIncome ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)' }]}>
        <Icon size={22} color={isIncome ? theme.success : theme.error} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.date, { color: theme.tabIconDefault }]}>{date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isIncome ? theme.success : theme.text }]}>
          {isIncome ? `+${amount}` : amount}
        </Text>
        <Text style={[styles.category, { color: theme.tabIconDefault }]}>{category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'transparent', // Can be set based on theme if needed
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
