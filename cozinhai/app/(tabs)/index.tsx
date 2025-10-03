/* import { Link } from "expo-router"; */
import { Image, ScrollView, StyleSheet, View } from "react-native";
import DailyRecipes from "../../components/DailyRecipes";
import { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

export default function Home() {
  const { colors } = useContext(themeContext);

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

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 25, // Maior espaçamento vertical no topo
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
  },
  quickSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12, // Forma sutilmente arredondada
    gap: 10,
    marginBottom: 30, // Espaço confortável após a busca
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickSearchText: {
    fontSize: 16,
  },
  shortcutsTitle: {
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  shortcutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 12, 
  },
  dailyTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  }
});