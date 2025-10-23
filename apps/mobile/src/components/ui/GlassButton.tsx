import React from "react";
import { Pressable, ViewStyle, TextStyle } from "react-native";
import { BlurView } from "expo-blur";

type GlassButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle | TextStyle;
  intensity?: number; // 20..100
  radius?: number;
  children: React.ReactNode;
};

export const GlassButton: React.FC<GlassButtonProps> = ({
  onPress,
  style,
  contentStyle,
  intensity = 60,
  radius = 12,
  children,
}) => {
  return (
    <BlurView
      intensity={intensity}
      tint="light" 
      style={[
        {
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.19)",
          borderWidth: 2,
          borderColor: "rgba(255,255,255,0.7)",
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            paddingVertical: 12,
            paddingHorizontal: 14,
            alignItems: "center",
            justifyContent: "center",
            // hafif “press” feedback
            opacity: pressed ? 0.9 : 1,
          },
          contentStyle,
        ]}
      >
        {children}
      </Pressable>
    </BlurView>
  );
};