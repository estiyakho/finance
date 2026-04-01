import Colors from '@/constants/Colors';
import { LABELS, useFinanceStore } from '@/store/useFinanceStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FinanceSummaryBoxProps {
  balance: number;
  income: number;
  expense: number;
  currency: string;
}

export default function FinanceSummaryBox({ balance, income, expense, currency }: FinanceSummaryBoxProps) {
  const { themeMode, language, incomeColor, expenseColor } = useFinanceStore();
  const themeColors = Colors[themeMode];
  const labels = LABELS[language];
  
  const balanceColor = balance < 0 ? expenseColor : incomeColor;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
      <View style={styles.topSection}>
        <View style={styles.balanceInfo}>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary, marginBottom: 8 }]}>{labels.balance}</Text>
          <Text style={[styles.amountMain, { color: balanceColor }]}>
            {`${currency} ${balance.toLocaleString()}`}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

      <View style={styles.bottomSection}>
        <View style={styles.statBox}>
          <Text style={[styles.statAmount, { color: incomeColor }]}>{income.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{labels.income}</Text>
        </View>
        <View style={[styles.verticalDivider, { backgroundColor: themeColors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statAmount, { color: expenseColor }]}>{expense.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>{labels.expense}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  balanceInfo: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  amountMain: {
    fontSize: 28,
    fontFamily: 'MartianMono-Bold',
    textAlign: 'center',
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
