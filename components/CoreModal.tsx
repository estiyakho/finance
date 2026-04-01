import React from 'react';
import { StyleSheet, Modal, TouchableOpacity, View as DefaultView, Animated, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceStore, LABELS } from '@/store/useFinanceStore';

interface CoreModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function CoreModal({ visible, onClose, title, children }: CoreModalProps) {
  const { language } = useFinanceStore();
  const labels = LABELS[language];

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
        <DefaultView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              {children}
            </View>
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
  modalContainer: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: 'transparent',
  },
  modalContent: {
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'MartianMono-Bold',
    color: '#FFF',
  },
  closeButton: {
    padding: 4,
  },
  body: {
    backgroundColor: 'transparent',
  },
});
