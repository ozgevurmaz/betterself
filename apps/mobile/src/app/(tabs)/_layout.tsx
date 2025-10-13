import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="habits" options={{ title: "Habits" }} />
      <Tabs.Screen name="social" options={{ title: "Social" }} />
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
    </Tabs>
  );
}
