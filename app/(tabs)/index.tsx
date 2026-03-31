import React from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const { width } = Dimensions.get('window');

function StatCard({ label, amount, type, icon: Icon }: any) {
  const theme = Colors[useColorScheme() ?? 'light'];
  const isPositive = type === 'income';
  return (
    <View style={[styles.statCard, { backgroundColor: theme.card }]}>
      <View style={[styles.statIconBox, { backgroundColor: isPositive ? 'rgba(50, 215, 75, 0.12)' : 'rgba(255, 69, 58, 0.12)' }]}>
        <Icon size={18} color={isPositive ? theme.success : theme.error} />
      </View>
      <View style={styles.statInfo}>
        <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>{label}</Text>
        <Text style={[styles.statAmount, { color: theme.text }]}>{amount}</Text>
      </View>
    </View>
  );
}

export default function OverviewScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[theme.tint, '#005f8a']}
        style={styles.balanceBox}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.balanceHeader}>
          <Wallet color="#fff" size={20} />
          <Text style={styles.balanceLabel}>Current Balance</Text>
        </View>
        <Text style={styles.balanceAmount}>$12,450.00</Text>
        <View style={styles.balanceFooter}>
          <TrendingUp color="#4ade80" size={16} />
          <Text style={styles.balanceTrend}>+2.5% from last month</Text>
        </View>
      </LinearGradient>

      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Statistics</Text>
      
      <View style={styles.statsRow}>
        <StatCard 
          label="Income" 
          amount="$4,500" 
          type="income" 
          icon={ArrowUpRight} 
        />
        <StatCard 
          label="Expenses" 
          amount="$1,240" 
          type="expense" 
          icon={ArrowDownLeft} 
        />
      </View>

      <View style={[styles.mainStatsCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.mainStatsTitle, { color: theme.text }]}>Weekly Spending</Text>
          <View style={styles.chartPlaceholder}>
            {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
              <View key={i} style={[styles.chartBar, { height: h, backgroundColor: theme.tint }]} />
            ))}
          </View>
          <View style={styles.chartLabels}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => (
              <Text key={i} style={[styles.chartLabel, { color: theme.tabIconDefault }]}>{l}</Text>
            ))}
          </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  balanceBox: {
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 28,
    marginTop: 10,
    shadowColor: '#00a8e8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  balanceTrend: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: (width - 44) / 2,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statInfo: {},
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  mainStatsCard: {
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  mainStatsTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  chartPlaceholder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
  },
  chartBar: {
    width: 25,
    borderRadius: 6,
    opacity: 0.9,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '700',
    width: 25,
    textAlign: 'center',
  },
});
