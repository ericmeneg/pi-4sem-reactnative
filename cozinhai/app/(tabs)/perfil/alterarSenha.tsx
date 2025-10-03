import { ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";
import VoltarHeader from "../../../components/VoltarHeader";

export default function alterarSenha() {
  return (
    <ScrollView>
      <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
        <VoltarHeader />
      </View>
    </ScrollView>
  );
}
