import { View, Text } from "react-native";
import { t } from "i18n";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <Text>{t("nav.habits")}</Text>
    </SafeAreaView>
  );
}