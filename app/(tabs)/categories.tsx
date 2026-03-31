import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Modal, TextInput, Pressable, FlatList, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');
import { Coffee, ShoppingBag, Home, CreditCard, Apple, Briefcase, Plus, X, Check, Trash2 } from 'lucide-react-native';
import SettingRow from '@/components/SettingRow';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Food & Drink', icon: Coffee, count: '12', color: '#10b981' },
  { id: '2', name: 'Shopping', icon: ShoppingBag, count: '8', color: '#3b82f6' },
  { id: '3', name: 'Housing', icon: Home, count: '4', color: '#6366f1' },
  { id: '4', name: 'Entertainment', icon: Apple, count: '10', color: '#f43f5e' },
  { id: '5', name: 'Transport', icon: CreditCard, count: '15', color: '#f59e0b' },
  { id: '6', name: 'Income', icon: Briefcase, count: '2', color: '#10b981' },
];

const COLOR_PALETTE: any = {
  Sky: ['#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7'],
  Emerald: ['#6ee7b7', '#34d399', '#10b981', '#059669'],
  Rose: ['#fb7185', '#f43f5e', '#e11d48', '#be123c'],
  Amber: ['#fcd34d', '#fbbf24', '#f59e0b', '#d97706'],
  Indigo: ['#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'],
  Slate: ['#cbd5e1', '#94a3b8', '#64748b', '#475569'],
};

export default function CategoriesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHue, setSelectedHue] = useState('Sky');
  
  const [tempName, setTempName] = useState('');
  const [tempColor, setTempColor] = useState('');

  const openEdit = (cat: any) => {
    setEditingCategory(cat);
    setTempName(cat.name);
    setTempColor(cat.color);
    
    // Attempt to find the hue for the existing color
    const hue = Object.keys(COLOR_PALETTE).find(h => COLOR_PALETTE[h].includes(cat.color)) || 'Sky';
    setSelectedHue(hue);
    setModalVisible(true);
  };

  const saveChanges = () => {
    setCategories(prev => prev.map(c => 
      c.id === editingCategory.id ? { ...c, name: tempName, color: tempColor } : c
    ));
    setModalVisible(false);
  };

  const deleteCategory = () => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${editingCategory.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setCategories(prev => prev.filter(c => c.id !== editingCategory.id));
            setModalVisible(false);
          } 
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.sectionHeader, { color: theme.sectionHeader }]}>Your Categories</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {categories.map((cat, index) => (
          <SettingRow 
            key={cat.id}
            icon={(props: any) => <cat.icon {...props} color={cat.color} />}
            label={cat.name}
            value={`${cat.count} items`}
            isLast={index === categories.length - 1}
            onPress={() => openEdit(cat)}
          />
        ))}
      </View>

      <View style={styles.addWrapper}>
        <Pressable style={({ pressed }) => [styles.addButton, { backgroundColor: theme.card, opacity: pressed ? 0.7 : 1 }]}>
          <Plus size={24} color={theme.tint} />
          <Text style={[styles.addText, { color: theme.text }]}>Create New Category</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Edit Category</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <X size={24} color={theme.tabIconDefault} />
              </Pressable>
            </View>

            <View style={styles.inputSection}>
              <Text style={[styles.inputLabel, { color: theme.tabIconDefault }]}>CATEGORY NAME</Text>
              <TextInput 
                value={tempName}
                onChangeText={setTempName}
                style={[styles.textInput, { color: theme.text, backgroundColor: theme.background }]}
                placeholderTextColor={theme.tabIconDefault}
              />
            </View>

            <View style={styles.pickerSection}>
              <Text style={[styles.inputLabel, { color: theme.tabIconDefault }]}>CHOOSE COLOR (HUES)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hueList}>
                {Object.keys(COLOR_PALETTE).map(hue => (
                  <Pressable 
                    key={hue}
                    onPress={() => {
                      setSelectedHue(hue);
                      setTempColor(COLOR_PALETTE[hue][1]); // Default to second shade
                    }}
                    style={[
                      styles.hueItem, 
                      { backgroundColor: COLOR_PALETTE[hue][1] },
                      selectedHue === hue && { borderWidth: 3, borderColor: '#fff' }
                    ]}
                  />
                ))}
              </ScrollView>

              <Text style={[styles.inputLabel, { color: theme.tabIconDefault, marginTop: 20 }]}>CHOOSE SHADE</Text>
              <View style={styles.shadeList}>
                {COLOR_PALETTE[selectedHue].map((shade: string) => (
                  <Pressable 
                    key={shade}
                    onPress={() => setTempColor(shade)}
                    style={[
                      styles.shadeItem, 
                      { backgroundColor: shade },
                      tempColor === shade && { borderWidth: 3, borderColor: '#fff' }
                    ]}
                  >
                    {tempColor === shade && <Check size={16} color="#fff" strokeWidth={4} />}
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <Pressable 
                onPress={saveChanges}
                style={({ pressed }) => [styles.saveButton, { backgroundColor: theme.tint, opacity: pressed ? 0.8 : 1 }]}
              >
                <Text style={styles.saveText}>Save Changes</Text>
              </Pressable>

              <Pressable 
                onPress={deleteCategory}
                style={({ pressed }) => [styles.deleteBtn, { opacity: pressed ? 0.7 : 1 }]}
              >
                <Trash2 size={22} color={theme.error} />
                <Text style={[styles.deleteText, { color: theme.error }]}>Delete Category</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  addWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  addText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  textInput: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerSection: {
    marginBottom: 32,
  },
  hueList: {
    flexDirection: 'row',
  },
  hueItem: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  shadeList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shadeItem: {
    width: (width - 80) / 4,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalActions: {
    gap: 12,
  },
  saveButton: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  deleteBtn: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
});
