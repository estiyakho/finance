import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch, Platform } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface SettingRowProps {
  icon: any;
  label: string;
  value?: string;
  type?: 'link' | 'switch' | 'select';
  isLast?: boolean;
  onPress?: () => void;
  isEnabled?: boolean;
}

export default function SettingRow({ icon: Icon, label, value, type = 'link', isLast = false, onPress, isEnabled }: SettingRowProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container, 
        { 
          borderBottomWidth: isLast ? 0 : 0.5,
          borderBottomColor: theme.border,
          opacity: pressed && type !== 'switch' ? 0.7 : 1 
        }
      ]}
      onPress={type !== 'switch' ? onPress : undefined}
    >
      <View style={styles.leftPart}>
        <View style={styles.iconContainer}>
          <Icon size={20} color={theme.tint} strokeWidth={2} />
        </View>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      </View>
      
      <View style={styles.rightContent}>
        {type === 'switch' ? (
          <Switch 
            value={isEnabled} 
            onValueChange={onPress as any}
            trackColor={{ false: '#38383a', true: theme.tint }}
            thumbColor={Platform.OS === 'ios' ? '#fff' : isEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        ) : (
          <>
            {value && <Text style={[styles.value, { color: theme.tabIconDefault }]}>{value}</Text>}
            <ChevronRight size={18} color={theme.tabIconDefault} strokeWidth={2.5} />
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 15,
    marginRight: 8,
    fontWeight: '500',
  },
});
