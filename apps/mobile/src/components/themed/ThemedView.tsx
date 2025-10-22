import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitKey, getHabitColor } from "../theme/theme-helpers";

type ThemedViewProps = ViewProps & {
  card?: boolean;
  habitKey?: HabitKey; 
  elevated?: boolean;
};

export const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  card,
  habitKey,
  elevated,
  ...rest
}) => {
  const { colors } = useTheme();
  const accent = habitKey ? getHabitColor(colors, habitKey) : colors.accent;

  return (
    <View
      style={[
        {
          backgroundColor: card ? colors.card : colors.bg,
          borderColor: card ? colors.border : "transparent",
          borderWidth: card ? 1 : 0,
          
          ...(habitKey
            ? { borderLeftWidth: 4, borderLeftColor: accent }
            : null),
          
          ...(elevated
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 3,
              }
            : null),
        },
        style,
      ]}
      {...rest}
    />
  );
};