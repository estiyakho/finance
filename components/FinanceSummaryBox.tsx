import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FinanceSummaryBoxProps {
  balance: number;
  income: number;
  expense: number;
  currency: string;
}

export default function FinanceSummaryBox({ balance, income, expense, currency }: FinanceSummaryBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          <Ionicons name="wallet-outline" size={24} color="#00AEEF" />
        </View>
        <View style={styles.balanceInfo}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={styles.amountMain}>{`${currency} ${balance.toLocaleString()}`}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomSection}>
        <View style={styles.statBox}>
          <Text style={styles.statAmount}>{`${currency} ${income.toLocaleString()}`}</Text>
          <Text style={styles.statLabel}>Income</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statAmount}>{`${currency} ${expense.toLocaleString()}`}</Text>
          <Text style={styles.statLabel}>Expense</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#1A2A2A',
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  balanceInfo: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
    fontFamily: 'MartianMono',
  },
  amountMain: {
    fontSize: 22,
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#111',
    marginVertical: 16,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  statAmount: {
    fontSize: 14,
    fontFamily: 'MartianMono-Bold',
    color: '#EEE',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: 'MartianMono',
    color: '#666',
    textTransform: 'uppercase',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#111',
  },
});
