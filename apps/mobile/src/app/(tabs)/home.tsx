import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../components/theme/ThemeProvider";
import { ThemeToggle } from "../../components/preferences/ThemeToggle";
import { RatioBar } from "../../components/themed/RatioBar";
import { ThemedView } from "../../components/themed/ThemedView";
import { ThemedText } from "../../components/themed/ThemedText";
import { HabitColorPicker } from "../../components/themed/HabitColorPicker";
import { ThemedButton } from "../../components/themed/ThemedButton";
import { ThemedInput } from "../../components/themed/ThemedInput";
import { useState } from "react";
import { HabitKey } from "../../components/theme/theme-helpers";

export default function Home() {
  const { colors, isDark } = useTheme();
  const [habit, setHabit] = useState<HabitKey>("habit1");
  const [progress, setProgress] = useState(0.42);
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: colors.bg }} edges={['top', 'left', 'right', 'bottom']}>
      <ThemedView style={[styles.container, { padding: colors.space.lg }]}>
        <ThemeToggle />


        <ThemedText weight="bold" size="lg" habitKey={habit}>
          Today's habits
        </ThemedText>

        <RatioBar value={progress} />

        <HabitColorPicker selected={habit} onSelect={setHabit} />

        <ThemedInput placeholder="Add..." />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ThemedButton
            title="+%10"
            onPress={() => setProgress((p) => Math.min(1, p + 0.1))}
          />
          <ThemedButton
            title="Reset"
            variant="outline"
            onPress={() => setProgress(0)}
          />
        </View>

      </ThemedView>
      <RatioBar value={30} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  card: { padding: 16 },
  habitsRow: { flexDirection: 'row', marginTop: 12 },
});