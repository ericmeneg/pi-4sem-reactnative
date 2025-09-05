import React, { useContext, useState } from "react";
import {ScrollView,StyleSheet,View,Image,ActivityIndicator,SafeAreaView,TextInput,Pressable,Alert,FlatList,Dimensions} from "react-native";
import { Text, Checkbox, Button, Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCard";
import { themeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { spoonacularService } from "../services/spoonacularService";

// Adaptada para que a API retorna
interface Recipe {
  id: number;
  title: string;
  image: string;
  // Adicione outras propriedades se seu RecipeCard original as usa e a API as retorna
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2; // 2 colunas com margem para o FlatList

export default function PesquisarReceitas() {
  const [filters, setFilters] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState<Recipe[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasSearched, setHasSearched] = useState(false);

  const { colors } = useContext(themeContext);

  const toggleFilter = (key: keyof typeof filters) => () => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Atenção", "Digite algo para pesquisar!");
      return;
    }

    setIsLoading(true); // Inicia o loading
    setSearchResults([]); // Limpa resultados anteriores
    setHasSearched(false); // Reseta o estado de busca

    try {
      console.log("Buscando receitas para:", searchQuery);

      const results = await spoonacularService.searchRecipes(searchQuery, "both");

      console.log("Resultados encontrados:", results.totalResults);

      setSearchResults(results.results);
      setHasSearched(true); // Define que uma busca foi realizada
    } catch (error) {
      console.error("Erro na busca:", error);
      Alert.alert(
        "Erro",
        "Não foi possível buscar as receitas. Verifique sua conexão e tente novamente."
      );
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  const handleRecipePress = (recipe: Recipe) => {
    console.log("Clicou na receita:", recipe.title);
  };

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCardWrapper}> {/* Wrapper para aplicar margem entre os cards */}
      <RecipeCard recipe={item} onPress={handleRecipePress} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.mainContent}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.mainImage}
            resizeMode="contain"
          />

          <Text style={[styles.title, { color: colors.darkBlue }]}>
            Pesquisar Receitas
          </Text>

          <View style={styles.inputContent} testID="headerContent">
            <TextInput
              placeholder="Busque suas receitas"
              style={[styles.input, { borderColor: colors.darkBlue }]}
              placeholderTextColor={"rgb(34, 87, 122, 38%)"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              editable={!isLoading}
            />
            <Pressable
              onPress={handleSearch}
              disabled={isLoading}
              style={[styles.searchButton, isLoading && styles.searchButtonDisabled]}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.darkBlue} />
              ) : (
                <FontAwesome name="search" size={20} color={colors.darkBlue} />
              )}
            </Pressable>
          </View>

          <Text style={[styles.subtitle, { color: colors.darkBlue }]}>
            Filtros Avançados
          </Text>

          <View style={styles.filters}>
            <View style={styles.filterItem}>
              <Checkbox.Android
                status={filters.vegan ? "checked" : "unchecked"}
                onPress={toggleFilter("vegan")}
                color={colors.darkBlue}
              />
              <Text>Vegano</Text>
            </View>

            <View style={styles.filterItem}>
              <Checkbox.Android
                status={filters.vegetarian ? "checked" : "unchecked"}
                onPress={toggleFilter("vegetarian")}
                color={colors.darkBlue}
              />
              <Text>Vegetariano</Text>
            </View>

            <View style={styles.filterItem}>
              <Checkbox.Android
                status={filters.glutenFree ? "checked" : "unchecked"}
                onPress={toggleFilter("glutenFree")}
                color={colors.darkBlue}
              />
              <Text>Sem Glúten</Text>
            </View>

            <View style={styles.filterItem}>
              <Checkbox.Android
                status={filters.dairyFree ? "checked" : "unchecked"}
                onPress={toggleFilter("dairyFree")}
                color={colors.darkBlue}
              />
              <Text>Sem Lactose</Text>
            </View>
          </View>

          <Button buttonColor={colors.darkBlue} mode="contained" onPress={() => console.log("Popular clicado")}>
            Pesquisar
          </Button>
        </View>

        {/* Exibe os resultados da pesquisa ou mensagem de estado */}
        {(isLoading || hasSearched) && (
          <View style={styles.searchResultsContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.text }]}>
                  Buscando receitas...
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderRecipe}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              hasSearched && (
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                    Nenhuma receita encontrada.
                  </Text>
                  <Text style={[styles.emptySubtext, { color: colors.secondaryText }]}>
                    Tente buscar por outros ingredientes ou nomes de receitas.
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        <View style={{ width: "100%" }}>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flex: 1,
  },
  mainContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  mainImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filters: {
    width: "100%",
    gap: 10,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterLabel: {
    color: "#22577A",
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%", 
    marginBottom: 20, 
  },
  input: {
    width: "70%", 
    borderWidth: 2,
    borderRadius: 16,
    padding: 6,
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
  },
  searchResultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16, 
  },
  recipeCardWrapper: {
    width: cardWidth,
  },
});