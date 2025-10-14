import React, { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Sun, Moon, Laptop } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { mode, setMode, isDark, colors } = useTheme();

  const options: Array<{ key: 'light' | 'dark' | 'system'; icon: React.ReactNode; label: string }> = useMemo(
    () => [
      { key: 'light',  icon: <Sun size={18} />,   label: 'Light'  },
      { key: 'dark',   icon: <Moon size={18} />,  label: 'Dark'   },
      { key: 'system', icon: <Laptop size={18} />, label: 'System' },
    ],
    []
  );

  return (
    <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {options.map((o) => {
        const active = mode === o.key;
        return (
          <Pressable
            key={o.key}
            onPress={() => setMode(o.key)}
            style={[
              styles.item,
              {
                backgroundColor: active ? (isDark ? '#2A3140' : '#EAEFFC') : 'transparent',
                borderRadius: colors.radii.md,
              },
            ]}
          >
            <View style={styles.icon}>{o.icon}</View>
            <Text style={[styles.label, { color: colors.fg }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 4,
    borderRadius: 16,
    alignItems: 'center',
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  icon: { marginTop: 1 },
  label: { fontSize: 14, fontWeight: '600' },
});