import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HalfSheet } from "../ui/fields/HalfSheet";


const EMOJIS = [
  "💧","🚰","🥤","🧊","🏃","🏋️","🚴","🧘","⏱️","🧠",
  "🍎","🥗","🍵","☕","📚","🛏️","🌙","🪥","🧴",
  "🧪","🧬","📝","📆","🎯","🔥","💤","👣","📖","🎧",
  "🍽️","🥕","🥦","🍫","🚭","📵","🧹","🧺","🧼",
  "🤝","💬","👥","💌","🕒","📱","🔔","💪","🚿","🧴",
];

type EmojiPickerProps = {
  visible: boolean;
  onClose: () => void;
  onPick: (emoji: string) => void;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ visible, onClose, onPick }) => {
  const { colors } = useTheme();
  const [q, setQ] = useState("");

  const data = useMemo(() => EMOJIS, []);

  return (
    <HalfSheet visible={visible} onClose={onClose} backgroundColor={colors.card} heightPercent={90}>
      <View style={{ gap: 12, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: colors.fg, fontSize: 18, fontWeight: "700" }}>Pick an emoji</Text>
          <Pressable onPress={onClose}><Text style={{ color: colors.muted }}>Done</Text></Pressable>
        </View>

        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search (optional)"
          placeholderTextColor={colors.muted}
          style={{
            color: colors.fg,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
        />

        <FlatList
          data={data}
          keyExtractor={(e, i) => `${e}-${i}`}
          numColumns={6}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => { onPick(item); onClose(); }}
              style={{
                flex: 1,
                aspectRatio: 1,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 26 }}>{item}</Text>
            </Pressable>
          )}
        />
      </View>
    </HalfSheet>
  );
};