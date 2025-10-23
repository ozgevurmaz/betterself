import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";

import { HalfSheet } from "./HalfSheet";
import { Theme } from "../../theme/tokens";
import { t } from "@i18n/index";


export type RepeatValue =
    | { kind: "any" }
    | { kind: "daily" }
    | { kind: "weekly"; weekday: number }
    | { kind: "custom"; days: number[] };

const dayShort = ["su", "mo", "tu", "we", "th", "fr", "sa"];

type RepeatPickerProps = {
    theme: Theme;
    value: RepeatValue;
    onChange: (v: RepeatValue) => void;
};

export const RepeatPicker: React.FC<RepeatPickerProps> = ({ theme, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [custom, setCustom] = useState<number[]>([1, 3, 5]);

    const label = useMemo(() => {
        switch (value.kind) {
            case "any":
                return t("habit.form.any");
            case "daily":
                return t("habit.form.daily");
            case "weekly":
                return `weekly (${dayShort[value.weekday]})`;
            case "custom":
                return `custom (${value.days.map((d) => dayShort[d]).join(", ")})`;
        }
    }, [value]);

    const toggleDay = (d: number) => {
        setCustom((arr) => (arr.includes(d) ? arr.filter((x) => x !== d) : [...arr, d]));
    };

    return (
        <View style={{
            paddingHorizontal: 15, paddingVertical: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <Text style={{ color: theme.fg, marginBottom: 6 }}>Repeat</Text>
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: theme.fg, fontSize: 18, fontWeight: "600" }}>{t("habit.form.repeat")}</Text>
                        <Pressable onPress={() => setOpen(false)}>
                            <Text style={{ color: theme.muted }}>{t("actions.close")}</Text>
                        </Pressable>
                    </View>
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
                        <Text style={{ color: theme.fg }}>{t("habit.form.any")}</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            onChange({ kind: "daily" });
                            setOpen(false);
                        }}
                        style={{
                            padding: 12,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: theme.border,
                        }}
                    >
                        <Text style={{ color: theme.fg }}>{t("repeat.daily")}</Text>
                    </Pressable>

                    <View style={{ gap: 8 }}>
                        <Text style={{ color: theme.muted }}>{t("repeat.weekly.title")}</Text>
                        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                            {dayShort.map((d, i) => (
                                <Pressable
                                    key={d}
                                    onPress={() => {
                                        onChange({ kind: "weekly", weekday: i });
                                        setOpen(false);
                                    }}
                                    style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 12,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: theme.border,
                                    }}
                                >
                                    <Text style={{ color: theme.fg }}>{d}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <View style={{ gap: 8 }}>
                        <Text style={{ color: theme.muted }}>{t("repeat.custom")}</Text>
                        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                            {dayShort.map((d, i) => {
                                const active = custom.includes(i);
                                return (
                                    <Pressable
                                        key={d}
                                        onPress={() => toggleDay(i)}
                                        style={{
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: active ? theme.fg : theme.border,
                                            backgroundColor: active ? theme.fg : "transparent",
                                        }}
                                    >
                                        <Text style={{ color: active ? theme.bg : theme.fg }}>{d}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                        <Pressable
                            onPress={() => {
                                onChange({ kind: "custom", days: [...custom].sort() });
                                setOpen(false);
                            }}
                            style={{
                                marginTop: 6,
                                alignSelf: "flex-start",
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                                borderRadius: 10,
                                backgroundColor: theme.primary,
                            }}
                        >
                            <Text style={{ color: theme.bg, fontWeight: "600" }}>{t("actions.set")}</Text>
                        </Pressable>
                    </View>
                </View>
            </HalfSheet>
        </View>
    );
};