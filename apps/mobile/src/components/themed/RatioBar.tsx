import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitKey, getHabitColor } from "../theme/theme-helpers";

type RatioBarProps = {
  value: number; // 0..1
  habitKey?: HabitKey;
  height?: number;
  rounded?: boolean;
  style?: ViewStyle;
  showTrackBorder?: boolean;
};

export const RatioBar: React.FC<RatioBarProps> = ({
  value,
  habitKey,
  height = 10,
  rounded = true,
  style,
  showTrackBorder = true,
}) => {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(1, value));
  const fill = getHabitColor(colors, habitKey, colors.accent);

  return (
    <View
      style={[
        {
          backgroundColor: colors.muted,
          height,
          borderRadius: rounded ? height / 2 : 0,
          overflow: "hidden",
          borderWidth: showTrackBorder ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: "100%",
          backgroundColor: fill,
        }}
      />
    </View>
  );
};
