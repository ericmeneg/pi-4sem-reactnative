/* import { Link } from "expo-router"; */
import { Image, ScrollView, Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import DailyRecipes from "../../components/DailyRecipes";

export default function Home() {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        {/* <Text>Você está no index.tsx</Text>
      <Link href="/receita">Ir para receitas</Link>
      <Link href="/ingredientesEpoca">Ir para ingrediente sazonais</Link>
      <Link href="../pesquisarReceitas">Ir para pesquisa de receitas</Link>
      <Link href="/playground">Ir para exemplos de componente</Link>
      <Link href={"/livroReceitas"}>Ir para livro de receitas</Link> */}

        <Image
          source={require("../../assets/logo.png")}
          style={globalStyles.logo}
          resizeMode="contain"
        />

        <DailyRecipes />
      </View>
    </ScrollView>
  );
}
