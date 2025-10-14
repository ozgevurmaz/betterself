import React from 'react';
import { View, Text, ViewProps, TextProps } from 'react-native';
import { useTheme } from './ThemeProvider';

export const ThemedView: React.FC<ViewProps & { card?: boolean }> = ({ style, card, ...rest }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: card ? colors.card : colors.bg,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export const ThemedText: React.FC<TextProps & { muted?: boolean }> = ({ style, muted, ...rest }) => {
  const { colors } = useTheme();
  return <Text style={[{ color: muted ? colors.muted : colors.fg }, style]} {...rest} />;
};