import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';

interface FinanceSummaryBoxProps {
  balance: number;
  income: number;
  expense: number;
  currency: string;
}

export default function FinanceSummaryBox({ balance, income, expense, currency }: FinanceSummaryBoxProps) {
  const { themeMode, language, accentColor } = useFinanceStore();
  const labels = LABELS[language];
  const themeColors = Colors[themeMode];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
      <View style={styles.topSection}>
        <View style={[styles.iconContainer, { backgroundColor: themeColors.backgroundSecondary }]}>
          <Ionicons name="wallet-outline" size={24} color={accentColor} />
        </View>
        <View style={styles.balanceInfo}>
          <Text style={[styles.amountMain, { color: themeColors.text }]}>{`${currency} ${balance.toLocaleString()}`}</Text>
        </View>
      </View>
      
      <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
      
      <View style={styles.bottomSection}>
        <View style={styles.statBox}>
          <Text style={[styles.statAmount, { color: '#4CAF50' }]}>{`${currency} ${income.toLocaleString()}`}</Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{labels.income}</Text>
        </View>
        <View style={[styles.verticalDivider, { backgroundColor: themeColors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statAmount, { color: '#FF5252' }]}>{`${currency} ${expense.toLocaleString()}`}</Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{labels.expense}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
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
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
    fontFamily: 'MartianMono',
  },
  amountMain: {
    fontSize: 22,
    fontFamily: 'MartianMono-Bold',
  },
  divider: {
    height: 1,
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
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: 'MartianMono',
    textTransform: 'uppercase',
  },
  verticalDivider: {
    width: 1,
    height: 24,
  },
});
