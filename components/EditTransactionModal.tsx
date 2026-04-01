import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '@/store/useFinanceStore';

interface EditTransactionModalProps {
  visible: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Transaction>) => void;
  onDelete: (id: string) => void;
}

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditTransactionModal({ visible, transaction, onClose, onSave, onDelete }: EditTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount.toString());
      setDate(transaction.date);
    }
  }, [transaction]);

  const handleConfirmDate = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const handleSave = () => {
    if (transaction && title && amount) {
      onSave(transaction.id, {
        title,
        amount: parseFloat(amount),
        date,
      });
      onClose();
    }
  };

  if (!transaction) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Edit Transaction</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Transaction Title"
                  placeholderTextColor="#444"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor="#444"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity 
                  style={styles.datePickerButton} 
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <Text style={styles.dateValue}>{date}</Text>
                  <Ionicons name="calendar-outline" size={18} color="#00AEEF" />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={() => setDatePickerVisibility(false)}
                  themeVariant="dark"
                />
              </View>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={[styles.button, styles.deleteButton]} 
                  onPress={() => {
                    onDelete(transaction.id);
                    onClose();
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]} 
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#121212',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
  },
  inputGroup: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 10,
    fontFamily: 'MartianMono',
    color: '#00AEEF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    color: '#FFF',
    fontFamily: 'MartianMono',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  datePickerButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  dateValue: {
    color: '#FFF',
    fontFamily: 'MartianMono',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#2A1A1A',
    borderWidth: 1,
    borderColor: '#4A1A1A',
  },
  deleteButtonText: {
    color: '#FF5252',
    fontFamily: 'MartianMono-Bold',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#00AEEF',
  },
  saveButtonText: {
    color: '#FFF',
    fontFamily: 'MartianMono-Bold',
    fontSize: 14,
  },
});
