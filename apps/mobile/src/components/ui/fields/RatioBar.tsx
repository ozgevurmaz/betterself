import React from "react";
import { View, ViewStyle } from "react-native";
import { Theme } from "../../theme/tokens";

type RatioBarProps = {
  value: number; // 0..1
  height?: number;
  rounded?: boolean;
  style?: ViewStyle;
  showTrackBorder?: boolean;
  theme: Theme
};

export const RatioBar: React.FC<RatioBarProps> = ({
  value,
  height = 10,
  rounded = true,
  style,
  showTrackBorder = true,
  theme
}) => {

  const clamped = Math.max(0, Math.min(1, value));

  return (
    <View
      style={[
        {
          backgroundColor: theme.muted,
          height,
          borderRadius: rounded ? height / 2 : 0,
          overflow: "hidden",
          borderWidth: showTrackBorder ? 1 : 0,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: "100%",
          backgroundColor: theme.primary,
        }}
      />
    </View>
  );
};
