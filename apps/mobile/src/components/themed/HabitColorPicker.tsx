import React from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitKey } from "../theme/theme-helpers";

type HabitColorPickerProps = {
  selected?: HabitKey;
  onSelect: (key: HabitKey) => void;
  keys?: HabitKey[];
  size?: number;
  gap?: number;
};

const DEFAULT_KEYS: HabitKey[] = [
  "habit1",
  "habit2",
  "habit3",
  "habit4",
  "habit5",
  "habit6",
];

export const HabitColorPicker: React.FC<HabitColorPickerProps> = ({
  selected,
  onSelect,
  keys = DEFAULT_KEYS,
  size = 36,
  gap = 10,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap }}>
      {keys.map((k) => {
        const c =
          (colors as any)?.habits?.[k] || (colors as any)?.[k] || colors.primary;
        const isActive = selected === k;
        return (
          <Pressable
            key={k}
            onPress={() => onSelect(k)}
            style={({ pressed }) => [
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: c,
                borderWidth: isActive ? 3 : 1,
                borderColor: isActive ? (isDark ? "#fff" : "#000") : colors.border,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          />
        );
      })}
    </View>
  );
};