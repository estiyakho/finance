import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <View style={[styles.container, { backgroundColor: '#121212' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.monthHeader}>
          <Ionicons name="chevron-back" size={24} color="#888" />
          <Text style={styles.monthText}>April 2026</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </View>

        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: '#1E1E1E' }]}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>BDT 4,265.0</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#1E1E1E' }]}>
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={[styles.summaryValue, { color: '#FF5252' }]}>BDT 1,070.0</Text>
          </View>
        </View>

        <View style={[styles.mainCard, { backgroundColor: '#1E1E1E' }]}>
          <Text style={styles.cardTitle}>Monthly Savings</Text>
          <Text style={styles.savingsValue}>BDT 3,195.0</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '75%' }]} />
          </View>
          <Text style={styles.progressText}>75% of income saved</Text>
        </View>

        <View style={[styles.listCard, { backgroundColor: '#1E1E1E' }]}>
          <Text style={styles.cardTitle}>Daily Average</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Income / Day</Text>
            <Text style={styles.detailValue}>BDT 142.1</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expense / Day</Text>
            <Text style={styles.detailValue}>BDT 35.6</Text>
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
  scrollContent: {
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginHorizontal: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  mainCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
  },
  savingsValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00AEEF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
  },
  listCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#FFF',
  },
  detailValue: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
});
