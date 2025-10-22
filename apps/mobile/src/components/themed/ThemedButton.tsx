import React from "react";
import { Pressable, Text, GestureResponderEvent, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitKey, getHabitColor } from "../theme/theme-helpers";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ThemedButtonProps = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  habitKey?: HabitKey;
  style?: ViewStyle;
};

const sizeMap: Record<Size, { py: number; px: number; radius: number; font: number }> = {
  sm: { py: 8, px: 12, radius: 10, font: 14 },
  md: { py: 10, px: 16, radius: 12, font: 16 },
  lg: { py: 14, px: 20, radius: 14, font: 18 },
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  variant = "solid",
  size = "md",
  disabled,
  habitKey,
  style,
}) => {
  const { colors, isDark } = useTheme();
  const tone = getHabitColor(colors, habitKey, colors.primary);
  const s = sizeMap[size];

  const base = {
    borderRadius: s.radius,
    paddingVertical: s.py,
    paddingHorizontal: s.px,
    borderWidth: variant === "outline" ? 1 : 0,
    borderColor: variant === "outline" ? tone : "transparent",
  } as ViewStyle;

  const bg =
    variant === "solid"
      ? tone
      : variant === "ghost"
      ? "transparent"
      : "transparent";

  const fg =
    variant === "solid"
      ? (isDark ? "#111" : "#fff") // solid olanda kontrast; gerekirse #000/#fff değiştir
      : tone;

  const disabledStyle: ViewStyle = disabled
    ? { opacity: 0.5, pointerEvents: "none" }
    : {};

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        base,
        { backgroundColor: bg, opacity: pressed ? 0.9 : 1 },
        style,
        disabledStyle,
      ]}
    >
      <Text style={{ color: fg, fontWeight: "600", fontSize: s.font }}>{title}</Text>
    </Pressable>
  );
};