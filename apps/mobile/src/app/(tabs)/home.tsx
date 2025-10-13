import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }} edges={['top','left','right','bottom']}>
      <Text>içerik hep safe alanın içinde 🎯</Text>
    </SafeAreaView>
  );
}