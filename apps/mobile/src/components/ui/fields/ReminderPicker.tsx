import React, { useMemo, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import { HalfSheet } from "./HalfSheet";
import { Theme } from "../../theme/tokens";

export type ReminderValue =
    | { kind: "any" }
    | { kind: "at"; time: string }
    | { kind: "in"; minutes: number };

type ReminderPickerProps = {
    theme: Theme;
    value: ReminderValue;
    onChange: (v: ReminderValue) => void;
};

function pad(n: number) {
    return n < 10 ? `0${n}` : `${n}`;
}

export const ReminderPicker: React.FC<ReminderPickerProps> = ({ theme, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [h, setH] = useState("09");
    const [m, setM] = useState("00");
    const [mins, setMins] = useState("15");

    const label = useMemo(() => {
        switch (value.kind) {
            case "any":
                return "any →";
            case "at":
                return `at ${value.time}`;
            case "in":
                return `in ${value.minutes} min`;
        }
    }, [value]);

    return (
        <View style={{
            paddingHorizontal: 15, paddingVertical: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <Text style={{ color: theme.fg, marginBottom: 6 }}>Reminder</Text>
            <Pressable
                onPress={() => setOpen(true)}
                style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                }}
            >
                <Text style={{ color: theme.fg }}>{label}</Text>
            </Pressable>

            <HalfSheet visible={open} onClose={() => setOpen(false)} backgroundColor={theme.card}>
                <View style={{ gap: 12 }}>
                    <Text style={{ color: theme.fg, fontSize: 18, fontWeight: "600" }}>Reminder</Text>

                    <Pressable
                        onPress={() => {
                            onChange({ kind: "any" });
                            setOpen(false);
                        }}
                        style={{
                            padding: 12,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: theme.border,
                        }}
                    >
                        <Text style={{ color: theme.fg }}>any →</Text>
                    </Pressable>

                    {/* Belirli saat */}
                    <View style={{ gap: 8 }}>
                        <Text style={{ color: theme.muted }}>At time (HH:MM)</Text>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TextInput
                                keyboardType="number-pad"
                                value={h}
                                onChangeText={(t) => setH(pad(Math.max(0, Math.min(23, Number(t) || 0))))}
                                maxLength={2}
                                style={{
                                    flex: 0.4,
                                    color: theme.fg,
                                    borderColor: theme.border,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                    textAlign: "center",
                                }}
                            />
                            <Text style={{ color: theme.fg, alignSelf: "center" }}>:</Text>
                            <TextInput
                                keyboardType="number-pad"
                                value={m}
                                onChangeText={(t) => setM(pad(Math.max(0, Math.min(59, Number(t) || 0))))}
                                maxLength={2}
                                style={{
                                    flex: 0.4,
                                    color: theme.fg,
                                    borderColor: theme.border,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                    textAlign: "center",
                                }}
                            />
                            <Pressable
                                onPress={() => {
                                    onChange({ kind: "at", time: `${h}:${m}` });
                                    setOpen(false);
                                }}
                                style={{
                                    paddingHorizontal: 16,
                                    borderRadius: 10,
                                    backgroundColor: theme.primary,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{ color: theme.bg, fontWeight: "600" }}>Set</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* X dakika sonra */}
                    <View style={{ gap: 8 }}>
                        <Text style={{ color: theme.muted }}>In X minutes</Text>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TextInput
                                keyboardType="number-pad"
                                value={mins}
                                onChangeText={setMins}
                                style={{
                                    flex: 1,
                                    color: theme.fg,
                                    borderColor: theme.border,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                }}
                            />
                            <Pressable
                                disabled={!mins || isNaN(Number(mins))}
                                onPress={() => {
                                    const mm = Number(mins) || 0;
                                    onChange({ kind: "in", minutes: mm });
                                    setOpen(false);
                                }}
                                style={{
                                    paddingHorizontal: 16,
                                    borderRadius: 10,
                                    backgroundColor: !mins || isNaN(Number(mins)) ? theme.border : theme.primary,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{ color: theme.bg, fontWeight: "600" }}>Set</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </HalfSheet>
        </View>
    );
};
