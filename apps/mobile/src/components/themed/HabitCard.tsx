import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitDraft } from "apps/mobile/types.d";

type HabitCardProps = {
    habit: HabitDraft;
    onPress?: () => void;   
};

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress }) => {
    const { colors } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 14,
                padding: 14,
                gap: 10,
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 28 }}>{habit.emoji}</Text>
                <Text style={{ color: colors.fg, fontSize: 18, fontWeight: "700", flex: 1 }}>
                    {habit.name}
                </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {/* Target etiketi */}
                <View style={{
                    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
                    backgroundColor: colors.fg
                }}>
                    <Text style={{ color: colors.bg, fontWeight: "600" }}>
                        {habit.target.kind === "any"
                            ? "any"
                            : `${habit.target.amount} ${habit.target.unit}`}
                    </Text>
                </View>

                {/* Repeat etiketi */}
                <View style={{
                    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
                    backgroundColor: colors.fg
                }}>
                    <Text style={{ color: colors.bg, fontWeight: "600" }}>
                        {habit.repeat.kind === "any"
                            ? "flexible"
                            : habit.repeat.kind === "daily"
                                ? "every day"
                                : habit.repeat.kind === "weekly"
                                    ? `weekly (${habit.repeat.weekday})`
                                    : `custom (${habit.repeat.days.length})`}
                    </Text>
                </View>

                {/* Reminder etiketi */}
                <View style={{
                    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
                    backgroundColor: colors.fg
                }}>
                    <Text style={{ color: colors.bg, fontWeight: "600" }}>
                        {habit.reminder.kind === "any"
                            ? "no reminder"
                            : habit.reminder.kind === "at"
                                ? `at ${habit.reminder.time}`
                                : `in ${habit.reminder.minutes}m`}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};