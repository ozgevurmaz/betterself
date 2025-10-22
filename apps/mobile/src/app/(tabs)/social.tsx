import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useTheme } from "../../components/theme/ThemeProvider";

export default function Social() {
  const { colors, isDark } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: colors.bg }}>
      <Text>Social</Text>
    </SafeAreaView>
  );
}