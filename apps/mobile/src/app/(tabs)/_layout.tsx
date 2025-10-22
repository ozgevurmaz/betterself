import { useMemo } from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../components/theme/ThemeProvider";

export default function TabsLayout() {
  const { colors, isDark } = useTheme();

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      sceneContainerStyle: { backgroundColor: colors.bg },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
        height: 80,
        paddingTop: 10,
        paddingBottom: 10,
      },
      tabBarBackground: () => (
        <View style={{ flex: 1, backgroundColor: colors.card }} />
      ),
    }),
    [colors, isDark]
  );

  return (
    <Tabs screenOptions={screenOptions}>

      <Tabs.Screen
        name="home"
        options={{
          title: "Today",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "time" : "time-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "calendar" : "calendar-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="social"
        options={{
          title: "Social",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}