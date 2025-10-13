import { View, Text } from "react-native";
import { t } from "i18n";

export default function Habits() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <Text>{t("nav.habits")}</Text>
    </View>
  );
}