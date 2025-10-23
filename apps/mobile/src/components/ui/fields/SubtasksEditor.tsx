import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import type { Subtask } from "apps/mobile/types.d";

type SubtasksEditorProps = {
  value: Subtask[];
  onChange: (next: Subtask[]) => void;
  title?: string;
};

function uid() {
  // Yeterince eşsiz kısa id
  return Math.random().toString(36).slice(2, 10);
}

export const SubtasksEditor: React.FC<SubtasksEditorProps> = ({
  value,
  onChange,
  title = "Subtasks",
}) => {
  const { colors } = useTheme();
  const [newTitle, setNewTitle] = useState("");

  const canAdd = newTitle.trim().length > 0;

  const addSubtask = () => {
    if (!canAdd) return;
    const next: Subtask = { id: uid(), title: newTitle.trim(), done: false };
    onChange([...(value ?? []), next]);
    setNewTitle("");
  };

  const toggleDone = (id: string) => {
    onChange(value.map(s => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const remove = (id: string) => {
    onChange(value.filter(s => s.id !== id));
  };

  const updateTitle = (id: string, title: string) => {
    onChange(value.map(s => (s.id === id ? { ...s, title } : s)));
  };

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ color: colors.fg, fontSize: 16, fontWeight: "700" }}>{title}</Text>

      {/* Ekleme satırı */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Add a subtask…"
          placeholderTextColor={colors.muted}
          style={{
            flex: 1,
            color: colors.fg,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
          onSubmitEditing={addSubtask}
        />
        <Pressable
          onPress={addSubtask}
          disabled={!canAdd}
          style={{
            paddingHorizontal: 14,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: canAdd ? colors.fg : colors.border,
          }}
        >
          <Text style={{ color: colors.bg, fontWeight: "700" }}>Add</Text>
        </Pressable>
      </View>

      {/* Liste */}
      <View style={{ gap: 8 }}>
        {value?.map(item => {
          const lineThrough = item.done ? "line-through" : "none";
          const textOpacity = item.done ? 0.7 : 1;
          return (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
            >
              {/* Checkbox */}
              <Pressable
                onPress={() => toggleDone(item.id)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: 1.5,
                  borderColor: item.done ? colors.fg : colors.border,
                  backgroundColor: item.done ? colors.fg : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.done && <Text style={{ color: colors.bg, fontWeight: "900" }}>✓</Text>}
              </Pressable>

              {/* Başlık (inline edit) */}
              <TextInput
                value={item.title}
                onChangeText={(t) => updateTitle(item.id, t)}
                placeholder="Subtask"
                placeholderTextColor={colors.muted}
                style={{
                  flex: 1,
                  color: colors.fg,
                  textDecorationLine: lineThrough as any,
                  opacity: textOpacity,
                  paddingVertical: 4,
                }}
              />

              {/* Sil */}
              <Pressable onPress={() => remove(item.id)} style={{ paddingHorizontal: 6, paddingVertical: 4 }}>
                <Text style={{ color: colors.muted }}>Remove</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};
