import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Você está no index.tsx</Text>
      <Link href="/receita">Ir para receitas</Link>
      <Link href="/ingredientesEpoca">Ir para ingrediente sazonais</Link>
    </View>
  );
}
