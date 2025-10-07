import { ScrollView, Text, View } from "react-native";
import VoltarHeader from "../../../components/VoltarHeader";
import { globalStyles } from "../../../styles/globalStyles";
import ComentarioCard from "../../../components/ComentarioCard";

export default function verComentarios() {
  return (
    <ScrollView style={{ paddingBottom: 40 }}>
      <View style={{ gap: 40 }}>
        <VoltarHeader />

        <Text style={globalStyles.tituloPagina}>Ver seus Comentários</Text>

        <View
          testID="ComentáriosSection"
          style={{ alignItems: "center", paddingHorizontal: 40, gap: 25 }}
        >
          <ComentarioCard nomeReceita="Churros" dataComentario="01/01/2025" />
          <ComentarioCard nomeReceita="Churros" dataComentario="01/01/2025" />
          <ComentarioCard nomeReceita="Churros" dataComentario="01/01/2025" />
        </View>
      </View>
    </ScrollView>
  );
}
