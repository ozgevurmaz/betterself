import React, { useMemo, useState } from "react";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { HalfSheet } from "./HalfSheet";
import { Theme } from "../../theme/tokens";
import { t } from "@i18n/index";

type Unit =
    | "mins"
    | "hours"
    | "kilometer"
    | "kg"
    | "gram"
    | "meter"
    | "piece"
    | "glass"
    | "liter"
    | "steps";

const UNITS: Unit[] = [
    "mins",
    "hours",
    "kilometer",
    "kg",
    "gram",
    "meter",
    "piece",
    "glass",
    "liter",
    "steps",
];

export type TargetValue =
    | { kind: "any" }
    | { kind: "fixed"; amount: number; unit: Unit };

type TargetPickerProps = {
    theme: Theme;
    value: TargetValue;
    onChange: (v: TargetValue) => void;
};

export const TargetPicker: React.FC<TargetPickerProps> = ({ theme, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<Unit>("glass");
    const [amount, setAmount] = useState<string>("8");

    const label = useMemo(() => {
        if (value.kind === "any") return "any →";
        return `${value.amount} ${value.unit}`;
    }, [value]);

    return (
        <View style={{
            paddingHorizontal: 15, paddingVertical: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <Text style={{ color: theme.fg, marginBottom: 6, }}>{t("habit.form.target")}</Text>
            <Pressable
                onPress={() => setOpen(true)}
                style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                }}
            >
                <Text style={{ color: theme.fg }}>{label}</Text>
            </Pressable>

            <HalfSheet
                visible={open}
                onClose={() => setOpen(false)}
                backgroundColor={theme.card}
                scrimColor={"rgba(0,0,0,0.45)"}
            >
                <View style={{ gap: 12, flex: 1 }}>
                    {/* üst bar */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: theme.fg, fontSize: 18, fontWeight: "600" }}>{t("habit.form.target")}</Text>
                        <Pressable onPress={() => setOpen(false)}>
                            <Text style={{ color: theme.muted }}>{t("actions.close")}</Text>
                        </Pressable>
                    </View>

                    {/* "Any" seçeneği */}
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
                            backgroundColor: "transparent",
                        }}
                    >
                        <Text style={{ color: theme.fg }}>{t("habit.form.any")}</Text>
                    </Pressable>

                    {/* quantity + unit */}
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextInput
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder={t("habit.form.target")}
                            placeholderTextColor={theme.muted}
                            style={{
                                flex: 1,
                                color: theme.fg,
                                backgroundColor: theme.card,
                                borderColor: theme.border,
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                            }}
                        />
                        <Pressable
                            disabled={!amount || isNaN(Number(amount))}
                            onPress={() => {
                                const amt = Number(amount) || 0;
                                onChange({ kind: "fixed", amount: amt, unit: selectedUnit });
                                setOpen(false);
                            }}
                            style={{
                                paddingHorizontal: 16,
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: !amount || isNaN(Number(amount)) ? theme.border : theme.primary,
                            }}
                        >
                            <Text style={{ color: theme.bg, fontWeight: "600" }}>{t("actions.set")}</Text>
                        </Pressable>
                    </View>

                    <Text style={{ color: theme.muted, marginTop: 4 }}>{t("units")}</Text>

                    <FlatList
                        data={UNITS}
                        keyExtractor={(u) => u}
                        numColumns={3}
                        columnWrapperStyle={{ gap: 10 }}
                        contentContainerStyle={{ gap: 10 }}
                        renderItem={({ item }) => {
                            const active = selectedUnit === item;
                            return (
                                <Pressable
                                    onPress={() => setSelectedUnit(item)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: active ? theme.fg : theme.border,
                                        backgroundColor: active ? theme.fg : "transparent",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ color: active ? theme.bg : theme.fg }}>{t(`units.${item}`)}</Text>
                                </Pressable>
                            );
                        }}
                    />
                </View>
            </HalfSheet>
        </View>
    );
};