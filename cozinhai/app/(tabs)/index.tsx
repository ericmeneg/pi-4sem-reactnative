/* import { Link } from "expo-router"; */
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { themeContext } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import Logo from "../../components/Logo";
import { IRecipe } from "../../interfaces/recipe.interface";
import { SPOONACULAR_API_KEY } from "@env";
import RecipeCard from "../../components/RecipeCard";
import { router } from "expo-router";

interface Alimento {
  nome: string;
  meses: number[];
}

const alimentos: Alimento[] = [
  { nome: "Abacaxi", meses: [1, 3, 9, 10, 11, 12] },
  { nome: "Abacate", meses: [2, 3, 4, 5] },
  { nome: "Acerola", meses: [9, 10, 11, 12] },
  { nome: "Ameixa", meses: [2, 3, 4, 12] },
  { nome: "Amora", meses: [10, 11] },
  { nome: "Banana", meses: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nome: "Caju", meses: [6, 8, 9] },
  { nome: "Caqui", meses: [4, 5] },
  { nome: "Carambola", meses: [1, 2, 6, 7, 8] },
  { nome: "Cidra", meses: [4] },
  { nome: "Coco", meses: [1, 2, 3, 9, 10, 11, 12] },
  { nome: "Cupuaçu", meses: [11, 12] },
  { nome: "Figo", meses: [1, 2, 3, 12] },
  { nome: "Fruta do Conde", meses: [1, 2, 3] },
  { nome: "Goiaba", meses: [2, 3] },
  { nome: "Jaca", meses: [2, 3, 4, 5, 11, 12] },
  { nome: "Jabuticaba", meses: [9, 10, 11] },
  { nome: "Kiwi", meses: [4, 5, 6, 7, 8] },
  { nome: "Laranja", meses: [1, 6, 8, 9, 10, 11, 12] },
  { nome: "Lima", meses: [6, 8, 9] },
  { nome: "Limão", meses: [3] },
  { nome: "Lichia", meses: [12] },
  { nome: "Maçã", meses: [2, 3, 4, 5, 6, 7, 8, 9] },
  { nome: "Mamão", meses: [1, 3, 6, 8, 9, 10, 11, 12] },
  { nome: "Manga", meses: [9, 10, 11, 12] },
  { nome: "Maracujá", meses: [1, 11, 12] },
  { nome: "Melancia", meses: [1, 10, 11, 12] },
  { nome: "Melão", meses: [10, 11, 12] },
  { nome: "Mexerica", meses: [6, 7, 8] },
  { nome: "Morango", meses: [6, 8] },
  { nome: "Nectarina", meses: [1, 3] },
  { nome: "Nêspera", meses: [9] },
  { nome: "Pera", meses: [2, 3, 4, 5] },
  { nome: "Pêssego", meses: [2, 3, 10, 11, 12] },
  { nome: "Pitanga", meses: [10, 11, 12] },
  { nome: "Seriguela", meses: [2, 3] },
  { nome: "Tangerina", meses: [3, 4, 5, 6, 7, 8, 9] },
  { nome: "Uva", meses: [1, 2, 3, 4, 5, 7] },
  { nome: "Acelga", meses: [3, 11, 12] },
  { nome: "Agrião", meses: [6, 7, 8] },
  { nome: "Alface", meses: [1, 3, 4, 11, 12] },
  { nome: "Alho-poró", meses: [3, 4, 5, 6, 7, 8, 9, 10] },
  { nome: "Almeirão", meses: [4, 5, 9, 10, 11, 12] },
  { nome: "Brócolis", meses: [6, 8, 9, 10] },
  { nome: "Catalonha", meses: [4, 9, 10] },
  { nome: "Cebolinha", meses: [1, 9, 11, 12] },
  { nome: "Chicória", meses: [6, 7, 8, 9, 10] },
  { nome: "Coentro", meses: [3, 6, 7, 8, 9, 10, 11, 12] },
  { nome: "Couve", meses: [1, 6, 7, 9, 10, 11, 12] },
  { nome: "Couve-flor", meses: [6, 8, 9, 10] },
  { nome: "Endívia", meses: [3] },
  { nome: "Erva-doce", meses: [5, 6, 7, 8, 9] },
  { nome: "Escarola", meses: [2, 3, 4, 6, 8] },
  { nome: "Espinafre", meses: [6, 7, 8, 9, 10, 11, 12] },
  { nome: "Folha de Uva", meses: [9] },
  { nome: "Hortelã", meses: [2, 9, 10] },
  { nome: "Louro", meses: [5] },
  { nome: "Mostarda", meses: [6, 7, 8, 9, 10] },
  { nome: "Orégano", meses: [9] },
  { nome: "Repolho", meses: [2, 3, 4] },
  { nome: "Rúcula", meses: [3, 6, 8, 10, 11, 12] },
  { nome: "Salsão", meses: [7] },
  { nome: "Salsa", meses: [1, 3, 11, 12] },
  { nome: "Abóbora", meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nome: "Abobrinha", meses: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12] },
  { nome: "Alcachofra", meses: [9] },
  { nome: "Aspargos", meses: [9] },
  { nome: "Batata-doce", meses: [5, 7, 9] },
  { nome: "Berinjela", meses: [2, 3, 4, 5, 9, 10, 11, 12] },
  { nome: "Beterraba", meses: [1, 2, 3, 4, 5, 9, 10, 11, 12] },
  { nome: "Cará", meses: [2, 3, 4, 5, 6, 8] },
  { nome: "Cenoura", meses: [5, 6, 7, 8, 9, 10, 11, 12] },
  { nome: "Chuchu", meses: [2, 3, 4, 5, 10, 11, 12] },
  { nome: "Cogumelo", meses: [9] },
  { nome: "Ervilha", meses: [6, 8, 9] },
  { nome: "Fava", meses: [6, 8, 9] },
  { nome: "Gengibre", meses: [2, 3, 4, 5] },
  { nome: "Inhame", meses: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nome: "Jiló", meses: [3] },
  { nome: "Mandioca", meses: [5, 6, 7, 10, 11, 12] },
  { nome: "Mandioquinha", meses: [5, 6, 7, 8, 10, 11, 12] },
  { nome: "Milho-verde", meses: [2, 3, 7] },
  { nome: "Nabo", meses: [3, 4, 5, 6, 7, 8] },
  { nome: "Palmito", meses: [7] },
  { nome: "Pepino", meses: [1, 2, 3, 4, 7, 9, 10, 11, 12] },
  { nome: "Pimentão", meses: [1, 2, 6, 8, 9, 10, 11, 12] },
  { nome: "Quiabo", meses: [1, 2, 3, 10, 11, 12] },
  { nome: "Rabanete", meses: [5, 6, 7, 8, 9, 10, 11, 12] },
  { nome: "Tomate", meses: [1, 2, 3, 4, 9, 10, 11, 12] },
  { nome: "Tomate-caqui", meses: [9] },
];

const mesesNome = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function shuffleArray<T>(arr: T[], seed: number): T[] {
  let t = seed;
  const rng = () => {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };

  return arr
    .map((v) => ({ v, sort: rng() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

async function getDailyRecipes(seed: number): Promise<IRecipe[]> {
  const API_KEY = "";
  const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";

  const res = await fetch(`${baseUrl}?apiKey=${API_KEY}&number=30`);
  const data = await res.json();

  const allRecipes: IRecipe[] = data.results ?? [];

  const shuffled = shuffleArray(allRecipes, seed);

  return shuffled.slice(0, 3);
}

function seededRand(seed: number) {
  let t = seed
  return function () {
    t += 0x6D2B79F5
    let x = t 
    x = Math.imul(x ^ (x >>> 15), x | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

function getDailySeeds(): number[] {
  let today = new Date().toISOString().split("T")[0];
  let baseSeed = parseInt(today.replace(/-/g, ""), 10);
  const rng = seededRand(baseSeed)
  const seeds: number[] = [];
  while (seeds.length < 3) {
    seeds.push(Math.floor(rng() * 5224));
  }
  return seeds;
}

export default function Home() {
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useContext(themeContext);

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  useEffect(() => {
    async function loadRecipes() {
      const todaySeed = parseInt(new Date().toISOString().split("T")[0].replace(/-/g, ""), 10);
      const gotRecipes = await getDailyRecipes(todaySeed);
      setRecipes(gotRecipes);
    }
    loadRecipes();
  }, []);


  const ingredientesDoMes = mesSelecionado
    ? alimentos
      .filter((a) => a.meses.includes(mesSelecionado))
      .map((a) => a.nome)
    : [];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 40,
    },
    header: {
      paddingVertical: 25,
      paddingHorizontal: 20,
    },
    mainTitle: {
      fontWeight: "bold",
      marginBottom: 5,
    },
    subTitle: {
      fontSize: 14,
    },
    quickSearchButton: {
      flexDirection: "row",
      alignItems: "center",
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
      fontWeight: "bold",
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 10,
    },
    shortcutsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 30,
      paddingHorizontal: 12,
    },
    dailyTitle: {
      fontWeight: "bold",
      marginBottom: 15,
      paddingHorizontal: 20,
    },

    main: {
      alignItems: "center",
      paddingTop: 25,
      paddingHorizontal: 16,
      gap: 20,
      marginBottom: 100,
    },
    safe: {
      flex: 1,
      backgroundColor: "#F9FAFB",
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.darkBlue,
      marginTop: 8,
    },
    mesSelecionadoBox: {
      backgroundColor: "#22577A",
      borderRadius: 50,
      paddingVertical: 14,
      paddingHorizontal: 40,
      alignItems: "center",
      marginTop: 16,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    mesSelecionadoText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.25)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: "100%",
      maxHeight: "60%",
      paddingVertical: 10,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 8,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    mesOption: { paddingVertical: 14, paddingHorizontal: 20 },
    mesOptionText: { fontSize: 16, color: "#22577A" },
    ingredientesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 20,
      gap: 12,
    },
    ingredienteTag: {
      backgroundColor: "#E6F4F1",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginBottom: 10,
      minWidth: 90,
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    ingredienteText: {
      fontSize: 15,
      color: "#22577A",
      fontWeight: "500",
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo />

        <View style={styles.main} testID="recomendaçõesSection">
          <Text style={styles.title}>Recomendações Diárias!</Text>
          <View testID="recipeCards" style={{ alignItems: "center" }}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onPress={(recipe) => router.push(`../recipe/${recipe.id}`)} />
            ))}
          </View>
        </View>

        <View style={styles.main} testID="sazonaisSection">
          <Text style={styles.title}>Ingredientes da Época</Text>

          <TouchableOpacity
            style={styles.mesSelecionadoBox}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.mesSelecionadoText}>
              {mesSelecionado
                ? `Mês Selecionado: ${mesesNome[mesSelecionado - 1]}`
                : "Selecionar Mês"}
            </Text>
          </TouchableOpacity>

          <View style={styles.ingredientesContainer}>
            {ingredientesDoMes.map((ingrediente) => (
              <View style={styles.ingredienteTag} key={ingrediente}>
                <Text style={styles.ingredienteText}>{ingrediente}</Text>
              </View>
            ))}
          </View>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={mesesNome}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.mesOption}
                    onPress={() => {
                      setMesSelecionado(index + 1);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.mesOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
}
