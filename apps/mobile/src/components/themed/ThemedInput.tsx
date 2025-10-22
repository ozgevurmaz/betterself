import React, { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { HabitKey, getHabitColor } from "../theme/theme-helpers";

type ThemedInputProps = TextInputProps & {
  invalid?: boolean;
  habitKey?: HabitKey;
};

export const ThemedInput: React.FC<ThemedInputProps> = ({
  style,
  invalid,
  habitKey,
  ...rest
}) => {
  const { colors, isDark } = useTheme();
  const [focused, setFocused] = useState(false);

  const focusColor = getHabitColor(colors, habitKey, colors.accent);

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: invalid
            ? "#e5484d"
            : focused
            ? focusColor
            : colors.border,
        },
      ]}
    >
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={isDark ? "#889" : "#889"}
        style={[
          {
            color: colors.fg,
            paddingVertical: 10,
            paddingHorizontal: 12,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
};