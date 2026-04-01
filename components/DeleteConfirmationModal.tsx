import React from 'react';
import { StyleSheet, Modal, TouchableOpacity, View as DefaultView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS } from '@/store/useFinanceStore';
import Colors from '@/constants/Colors';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmationModal({ visible, onClose, onConfirm, title }: DeleteConfirmationModalProps) {
  const { themeMode, language, expenseColor } = useFinanceStore();
  const themeColors = Colors[themeMode];
  const labels = LABELS[language];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity 
        style={[styles.overlay, { backgroundColor: themeMode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.85)' }]} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <DefaultView style={[styles.modalContent, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${expenseColor}20`, borderColor: `${expenseColor}40` }]}>
            <Ionicons name="trash-outline" size={32} color={expenseColor} />
          </View>
          
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>{labels.delete}?</Text>
          <Text style={[styles.modalSubtitle, { color: themeColors.textSecondary }]}>{`Are you sure you want to delete "${title}"?`}</Text>
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton, { backgroundColor: themeColors.card, borderColor: themeColors.border }]} 
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, { color: themeColors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.deleteButton, { backgroundColor: expenseColor }]} 
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </DefaultView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#121212',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#222',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A1A1A',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: 'MartianMono',
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#222',
  },
  cancelButtonText: {
    color: '#888',
    fontFamily: 'MartianMono-Bold',
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
  },
  deleteButtonText: {
    color: '#FFF',
    fontFamily: 'MartianMono-Bold',
    fontSize: 13,
  },
});
