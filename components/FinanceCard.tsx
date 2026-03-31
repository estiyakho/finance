import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { TrendingUp, Wallet } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function FinanceCard({ balance = "12,450.00", currency = "$" }: { balance?: string, currency?: string }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <LinearGradient
      colors={['#6366f1', '#4f46e5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Wallet color="#fff" size={20} />
        </View>
        <Text style={styles.label}>Total Balance</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.currency}>{currency}</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>
      <View style={styles.footer}>
        <TrendingUp color="#4ade80" size={16} />
        <Text style={styles.trend}>+2.5% from last month</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    padding: 24,
    borderRadius: 28,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 15,
    marginVertical: 16,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 4,
  },
  balance: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  trend: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
});
