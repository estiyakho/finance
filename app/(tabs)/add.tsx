import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { DollarSign, Tag, Calendar, Check } from 'lucide-react-native';
import SettingRow from '@/components/SettingRow';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function AddTransactionScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Drink');
  const [date, setDate] = useState('2026-03-31');

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Transaction Details</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.inputRow}>
          <DollarSign size={24} color={theme.tint} style={styles.inputIcon} />
          <TextInput 
            placeholder="0.00"
            placeholderTextColor={theme.tabIconDefault}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            style={[styles.input, { color: theme.text }]}
          />
        </View>
        <SettingRow icon={Tag} label="Category" value={category} />
        <SettingRow icon={Calendar} label="Date" value={date} isLast={true} />
      </View>

      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Notes</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <TextInput 
          placeholder="Add a description..."
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.textArea, { color: theme.text }]}
          multiline
        />
      </View>

      <Pressable style={({ pressed }) => [styles.submitButton, { backgroundColor: theme.tint, opacity: pressed ? 0.8 : 1 }]}>
        <Check size={24} color="#fff" strokeWidth={3.5} />
        <Text style={styles.submitText}>Save Transaction</Text>
      </Pressable>
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
    letterSpacing: 1.5,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    fontSize: 32,
    fontWeight: '700',
    flex: 1,
    letterSpacing: -0.5,
  },
  textArea: {
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginHorizontal: 16,
    marginTop: 40,
    height: 64,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00a8e8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },
});
