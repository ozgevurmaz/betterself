import React from "react";
import { Image, Text, View } from "react-native";

export function Avatar({
  size = 32,
  name,
  uri,
  bg = "#111",
  fg = "#fff",
}: {
  size?: number;
  name: string;
  uri?: string;
  bg?: string;
  fg?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
      }}
    >
      <Text style={{ color: fg, fontWeight: "700" }}>{initials}</Text>
    </View>
  );
}