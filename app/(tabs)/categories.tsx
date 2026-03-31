import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Coffee, ShoppingBag, Home, Trash2, CreditCard, Apple, Briefcase, Plus } from 'lucide-react-native';
import SettingRow from '@/components/SettingRow';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const CATEGORIES = [
  { id: '1', name: 'Food & Drink', icon: Coffee, count: '12' },
  { id: '2', name: 'Shopping', icon: ShoppingBag, count: '8' },
  { id: '3', name: 'Housing', icon: Home, count: '4' },
  { id: '4', name: 'Entertainment', icon: Apple, count: '10' },
  { id: '5', name: 'Transport', icon: CreditCard, count: '15' },
  { id: '6', name: 'Income', icon: Briefcase, count: '2' },
];

export default function CategoriesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Your Categories</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {CATEGORIES.map((cat, index) => (
          <SettingRow 
            key={cat.id}
            icon={cat.icon}
            label={cat.name}
            value={`${cat.count} items`}
            isLast={index === CATEGORIES.length - 1}
          />
        ))}
      </View>

      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Actions</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <SettingRow icon={Plus} label="Add New Category" isLast={false} />
        <SettingRow icon={Trash2} label="Reset Categories" isLast={true} />
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
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
});
