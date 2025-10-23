import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../components/theme/ThemeProvider";
import { ThemeToggle } from "../../components/preferences/ThemeToggle";
import { ThemedText } from "../../components/themed/ThemedText";
import { ThemedButton } from "../../components/themed/ThemedButton";
import { useState } from "react";
import { HabitKey } from "../../components/theme/theme-helpers";
import { Friend, HabitDraft, ReminderValue, RepeatValue, TargetValue } from "apps/mobile/types.d";
import { HabitForm } from "../../components/habits/HabitForm";

import { t } from "i18n";
import { RatioBar } from "../../components/ui/fields/RatioBar";
import { HabitCard } from "../../components/themed/HabitCard";


const MOCK: Friend[] = [
  { id: "1", name: "Elif Özge", username: "elifozge" },
  { id: "2", name: "Mert Y.", username: "merty" },
  { id: "3", name: "Ece K." },
];

export default function Home() {
  const { colors, isDark } = useTheme();
  const [habits, setHabits] = useState<HabitDraft[]>([]);
  const [isHabitFormOpen, setHabitFormOpen] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: colors.bg }} edges={['top', 'left', 'right', 'bottom']}>
      <HabitForm
        friends={MOCK}
        onSubmit={(draft) => {

        }}
        visible={isHabitFormOpen}
        onClose={() => setHabitFormOpen(false)}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginHorizontal: 10, marginBottom: 2 }}>
        <ThemedText weight="bold" size="lg" habitKey="habit1">
          {t("today.title")}
        </ThemedText>

        <ThemedButton title={t("actions.addHabit")} onPress={() => { setHabitFormOpen(true) }} />
      </View>
      <RatioBar value={0.3} height={6} rounded theme={colors} />
      
      <ThemeToggle />

      {habits && habits.length > 0 && habits.map(habit =>
        <HabitCard habit={habit} />
      )}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16 },
  card: { padding: 16 },
  habitsRow: { flexDirection: 'row', marginTop: 12 },
});