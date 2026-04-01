import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { BarChart, PieChart } from "react-native-gifted-charts";
import { useFinanceStore, LABELS } from '@/store/useFinanceStore';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function StatsScreen() {
  const { transactions, currency, accentColor, language } = useFinanceStore();
  const labels = LABELS[language];

  const totalIncome = useMemo(() => 
    transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : 0), 0),
    [transactions]
  );
  
  const totalExpense = useMemo(() => 
    transactions.reduce((acc, t) => acc + (t.type === 'expense' ? t.amount : 0), 0),
    [transactions]
  );

  const barData = useMemo(() => {
    // Group last 7 days or just show Income vs Expense for now
    return [
      { 
        value: totalIncome, 
        label: labels.income, 
        frontColor: '#4CAF50',
        gradientColor: '#4CAF50',
        spacing: 40,
        labelTextStyle: { color: '#666', fontFamily: 'MartianMono', fontSize: 10 }
      },
      { 
        value: totalExpense, 
        label: labels.expense, 
        frontColor: '#FF5252',
        gradientColor: '#FF5252',
        labelTextStyle: { color: '#666', fontFamily: 'MartianMono', fontSize: 10 }
      },
    ];
  }, [totalIncome, totalExpense, labels]);

  const pieData = useMemo(() => [
    { value: totalIncome, color: '#4CAF50', text: 'Income' },
    { value: totalExpense, color: '#FF5252', text: 'Expense' },
  ], [totalIncome, totalExpense]);

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: accentColor }]}>{labels.stats}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{labels.income}</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>{`${currency} ${totalIncome.toLocaleString()}`}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{labels.expense}</Text>
            <Text style={[styles.summaryValue, { color: '#FF5252' }]}>{`${currency} ${totalExpense.toLocaleString()}`}</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Income vs Expense</Text>
          <View style={styles.chartWrapper}>
            <BarChart
              data={barData}
              barWidth={60}
              noRotation
              dashGap={0}
              hideRules
              yAxisThickness={0}
              xAxisThickness={0}
              hideYAxisText
              isAnimated
              animationDuration={800}
            />
          </View>
        </View>

        <View style={[styles.chartSection, { marginBottom: 40 }]}>
          <Text style={styles.chartTitle}>Distribution</Text>
          <View style={styles.pieWrapper}>
            <PieChart
              data={pieData}
              donut
              sectionAutoFocus
              radius={80}
              innerRadius={60}
              innerCircleColor={'#000'}
              centerLabelComponent={() => {
                const perc = totalIncome + totalExpense > 0 
                  ? Math.round((totalExpense / (totalIncome + totalExpense)) * 100)
                  : 0;
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white', fontFamily: 'MartianMono-Bold' }}>{perc}%</Text>
                    <Text style={{ fontSize: 10, color: '#666', fontFamily: 'MartianMono' }}>Exp</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'MartianMono-Bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#111',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: 'MartianMono',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'MartianMono-Bold',
  },
  summaryDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#111',
  },
  chartSection: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#111',
  },
  chartTitle: {
    fontSize: 14,
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
    marginBottom: 24,
  },
  chartWrapper: {
    alignItems: 'center',
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  pieWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
});
