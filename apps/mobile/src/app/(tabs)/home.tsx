import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText, ThemedView } from "../../components/theme/themed";
import { useTheme } from "../../components/theme/ThemeProvider";
import { ThemeToggle } from "../../components/preferences/ThemeToggle";

export default function Home() {
  const { colors, isDark } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }} edges={['top','left','right','bottom']}>
     <ThemedView style={[styles.container, { padding: colors.space.lg }]}>
      <ThemeToggle />

      <ThemedView card style={[styles.card, { borderRadius: colors.radii['2xl'], borderColor: colors.border, borderWidth: 1 }]}>
        <ThemedText style={{ fontSize: colors.fontSize['2xl'], fontWeight: '700', marginBottom: colors.space.sm }}>
          BetterSelf Dashboard
        </ThemedText>
        <ThemedText muted>Merhaba Özge! Tema {isDark ? 'Dark' : 'Light'} modda.</ThemedText>

        <View style={styles.habitsRow}>
          {(['habit1','habit2','habit3','habit4','habit5','habit6'] as const).map((k) => (
            <View key={k} style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: (colors as any)[k], marginRight: 8 }} />
          ))}
        </View>
      </ThemedView>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  card: { padding: 16 },
  habitsRow: { flexDirection: 'row', marginTop: 12 },
});