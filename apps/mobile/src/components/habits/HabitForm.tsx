import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { EmojiPicker } from "../themed/EmojiPicker";
import { FriendPicker } from "../ui/fields/FriendPicker";
import { TargetPicker, TargetValue } from "../ui/fields/TargetPicker";
import { RepeatPicker, RepeatValue } from "../ui/fields/RepeatPicker";
import { ReminderPicker } from "../ui/fields/ReminderPicker";
import { ThemedView } from "../themed/ThemedView";
import { HabitColorPicker } from "../themed/HabitColorPicker";
import { getHabitColor, HabitKey } from "../theme/theme-helpers";

import { HabitDraft, Friend, ReminderValue, Subtask } from "apps/mobile/types.d";
import { GlassButton } from "../ui/GlassButton";
import { HalfSheet } from "../ui/fields/HalfSheet";
import { SubtasksEditor } from "../ui/fields/SubtasksEditor";
import { t } from "@i18n/index";

type HabitFormProps = {
    initial?: Partial<HabitDraft>;
    friends: Friend[];
    onSubmit: (draft: HabitDraft) => void;
    visible: boolean;
    onClose: () => void;
};

export const HabitForm: React.FC<HabitFormProps> = ({ initial, friends, onSubmit, visible, onClose }) => {
    const { colors } = useTheme();

    const [name, setName] = useState(initial?.name ?? "");
    const [emoji, setEmoji] = useState(initial?.emoji ?? "💧");

    // store the habit color as a key like "habit1" | "habit2"...
    const [color, setColor] = useState<HabitKey>(
        (initial?.color as HabitKey) ?? "habit1"
    );

    const [target, setTarget] = useState<TargetValue>(initial?.target ?? { kind: "any" });
    const [repeat, setRepeat] = useState<RepeatValue>(initial?.repeat ?? { kind: "any" });
    const [reminder, setReminder] = useState<ReminderValue>(initial?.reminder ?? { kind: "any" });
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>(initial?.friends ?? []);
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [subtasks, setSubtasks] = useState<Subtask[]>(initial?.subtasks ?? []);

    const canSubmit = name.trim().length > 0 && Boolean(emoji);

    // Map the selected habit key to an actual color for the preview banner
    const bannerBg = useMemo(() => getHabitColor(colors, color, colors.card), [colors, color]);

    return (
        <HalfSheet
            visible={visible}
            onClose={onClose}
            backgroundColor={colors.card}
            heightPercent={100}
            style={{ padding: 20, gap: 30, justifyContent: "flex-start", flex: 1 }}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.fg, fontSize: 18, fontWeight: "700" }}>{t("habit.form.title")}</Text>
                <Pressable onPress={onClose}>
                    <Text style={{ color: colors.muted }}>{t("actions.close")}</Text>
                </Pressable>
            </View>

            <View style={{ alignContent: "center" }}>
                <ThemedView
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                        backgroundColor: bannerBg,
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 20,
                        transform: [{ rotate: '-2deg' }]
                    }}
                >
                    {/* Emoji */}

                    <GlassButton onPress={() => setEmojiOpen(true)} style={{ alignSelf: "flex-start", marginVertical: "auto" }}>
                        <Text style={{ fontSize: 24 }}>{emoji}</Text>
                    </GlassButton>

                    <EmojiPicker
                        visible={emojiOpen}
                        onClose={() => setEmojiOpen(false)}
                        onPick={setEmoji}
                    />

                    {/* Name */}
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginBottom: 6, color: "white", fontWeight: "bold", fontFamily: "" }}>Habit name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="drink water, workout, read 20 pages…"
                            placeholderTextColor={"rgba(255,255,255,0.7)"}
                            style={{
                                color: "white",
                                backgroundColor: "transparent",
                                borderColor: "rgba(255,255,255,0.7)",
                                borderBottomWidth: 1,
                                borderRadius: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                            }}
                        />
                    </View>
                </ThemedView>

                {/* Color keys */}
                <HabitColorPicker selected={color} onSelect={setColor} />

                {/* Target / Repeat / Reminder / Friends */}
                <TargetPicker value={target} onChange={setTarget} theme={colors} />
                <View style={{ width: "100%", height: 1, backgroundColor: bannerBg, marginVertical: 2 }} />
                <RepeatPicker value={repeat} onChange={setRepeat} theme={colors} />
                <View style={{ width: "100%", height: 1, backgroundColor: bannerBg, marginVertical: 2 }} />
                <ReminderPicker value={reminder} onChange={setReminder} theme={colors} />
                <View style={{ width: "100%", height: 1, backgroundColor: bannerBg, marginVertical: 2 }} />
                {/* FriendPicker we built uses useTheme() internally — no theme prop */}
                <FriendPicker
                    friends={friends}
                    value={selectedFriends}
                    onChange={setSelectedFriends}
                    theme={colors}
                    multiple
                />

                <SubtasksEditor value={subtasks} onChange={setSubtasks} />
            </View>
            {/* Submit */}
            <Pressable
                disabled={!canSubmit}
                onPress={() =>
                    onSubmit({
                        name: name.trim(),
                        emoji,
                        target,
                        repeat,
                        reminder,
                        friends: selectedFriends,
                        color,
                    } as HabitDraft)
                }
                style={{
                    marginTop: 10,
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: "center",
                    backgroundColor: canSubmit ? colors.fg : colors.border,
                }}
            >
                <Text style={{ color: colors.bg, fontWeight: "700" }}>Save habit</Text>
            </Pressable>
        </HalfSheet>
    );
};
