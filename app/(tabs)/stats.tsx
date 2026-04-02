import React, { useState, useMemo } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { useFinanceStore, LABELS, Transaction } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  const { transactions, currency, language, themeMode, accentColor, incomeColor, expenseColor } = useFinanceStore();
  const insets = useSafeAreaInsets();
  const labels = LABELS[language];
  const themeColors = Colors[themeMode];

  // Initial generation from Jan 2026 to Today + 24 months
  const generateInitialMonths = () => {
    const list = [];
    const now = new Date();
    const startYear = 2026;
    const startMonth = 0; // January
    
    // Total months from Jan 2026 to Now
    const totalMonthsSinceStart = (now.getFullYear() - startYear) * 12 + (now.getMonth() - startMonth);
    
    // Generate from Jan 2026 up to Now + 24 months
    for (let i = -totalMonthsSinceStart; i <= 24; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
        list.push({
          label: d.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { month: 'short' }),
          year: d.getFullYear(),
          month: d.getMonth(),
          id: `${d.getFullYear()}-${d.getMonth()}`,
          isToday: i === 0,
          relativeIndex: i, // to track distance from now
        });
    }
    return list;
  };

  const [monthsData, setMonthsData] = useState(generateInitialMonths());
  const todayIndex = monthsData.findIndex(m => m.isToday);
  const [selectedMonth, setSelectedMonth] = useState(monthsData[todayIndex]);
  const flatListRef = React.useRef<FlatList>(null);

  // Reset to today on mount
  React.useEffect(() => {
    const freshMonths = generateInitialMonths();
    setMonthsData(freshMonths);
    const freshTodayIdx = freshMonths.findIndex(m => m.isToday);
    setSelectedMonth(freshMonths[freshTodayIdx]);
    
    // Small delay to ensure FlatList is ready
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: freshTodayIdx,
        animated: false,
        viewOffset: 16, // Padding
      });
    }, 100);
  }, []);

  const loadMoreFutureMonths = () => {
    setMonthsData(prev => {
        const lastMonth = prev[prev.length - 1];
        const newBatch = [];
        for (let i = 1; i <= 12; i++) {
            const d = new Date(lastMonth.year, lastMonth.month + i, 1);
            const now = new Date();
            const relIdx = (d.getFullYear() - now.getFullYear()) * 12 + (d.getMonth() - now.getMonth());
            
            newBatch.push({
                label: d.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { month: 'short' }),
                year: d.getFullYear(),
                month: d.getMonth(),
                id: `${d.getFullYear()}-${d.getMonth()}`,
                isToday: false,
                relativeIndex: relIdx,
            });
        }
        return [...prev, ...newBatch];
    });
  };

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.dateTimestamp || t.createdAt || 0);
      return d.getFullYear() === selectedMonth.year && d.getMonth() === selectedMonth.month;
    });
  }, [transactions, selectedMonth]);

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    monthlyTransactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return { income, expense };
  }, [monthlyTransactions]);

  const renderMonthItem = ({ item }: { item: any }) => {
    const isActive = selectedMonth.id === item.id;
    return (
      <TouchableOpacity 
        style={[
          styles.monthItem, 
          isActive && { borderColor: accentColor, backgroundColor: `${accentColor}10` }
        ]} 
        onPress={() => setSelectedMonth(item)}
      >
        <Text style={[styles.monthLabel, isActive && { color: accentColor }]}>{item.label}</Text>
        <Text style={[styles.yearLabel, { color: themeColors.textSecondary }]}>{item.year}</Text>
      </TouchableOpacity>
    );
  };

  const renderTransactionSimple = ({ item }: { item: Transaction }) => {
    const dateObj = new Date(item.dateTimestamp || item.createdAt || 0);
    const day = dateObj.getDate();
    const amountColor = item.type === 'income' ? incomeColor : expenseColor;

    return (
      <View style={[styles.simpleCard, { borderColor: themeColors.border }]}>
        <View style={styles.simpleLeft}>
          <Text style={[styles.dayText, { color: themeColors.textSecondary }]}>{day}</Text>
          <Text style={[styles.simpleTitle, { color: themeColors.text }]} numberOfLines={1}>{item.title}</Text>
        </View>
        <Text style={[styles.simpleAmount, { color: amountColor }]}>
          {item.amount.toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      <StatusBar 
        barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>{labels.stats}</Text>
      </View>

      <View style={styles.selectorContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={monthsData}
          keyExtractor={item => item.id}
          renderItem={renderMonthItem}
          contentContainerStyle={styles.selectorContent}
          onEndReached={loadMoreFutureMonths}
          onEndReachedThreshold={0.5}
          getItemLayout={(data, index) => ({
            length: 80 + 12, // minWidth (80) + gap (12)
            offset: (80 + 12) * index,
            index,
          })}
        />
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
          <View style={[styles.statIcon, { backgroundColor: `${incomeColor}20` }]}>
            <Ionicons name="trending-up" size={16} color={incomeColor} />
          </View>
          <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>{labels.income}</Text>
          <Text style={[styles.summaryAmount, { color: incomeColor }]}>{totals.income.toLocaleString()}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
          <View style={[styles.statIcon, { backgroundColor: `${expenseColor}20` }]}>
            <Ionicons name="trending-down" size={16} color={expenseColor} />
          </View>
          <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>{labels.expense}</Text>
          <Text style={[styles.summaryAmount, { color: expenseColor }]}>{totals.expense.toLocaleString()}</Text>
        </View>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={monthlyTransactions}
        keyExtractor={item => item.id}
        renderItem={renderTransactionSimple}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color={themeColors.border} />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>No data for this month</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'MartianMono-Bold',
  },
  selectorContainer: {
    paddingVertical: 12,
  },
  selectorContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  monthItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    minWidth: 80,
  },
  monthLabel: {
    fontSize: 13,
    fontFamily: 'MartianMono-Bold',
    marginBottom: 2,
  },
  yearLabel: {
    fontSize: 9,
    fontFamily: 'MartianMono',
  },
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: 'MartianMono',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontFamily: 'MartianMono-Bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  simpleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  simpleLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'MartianMono-Bold',
    marginRight: 16,
    width: 24,
  },
  simpleTitle: {
    fontSize: 13,
    fontFamily: 'MartianMono',
    flex: 1,
  },
  simpleAmount: {
    fontSize: 13,
    fontFamily: 'MartianMono-Bold',
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    opacity: 0.5,
  },
  emptyText: {
    marginTop: 12,
    fontFamily: 'MartianMono',
    fontSize: 12,
  }
});
