import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  LayoutRectangle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themeContext } from "../../context/ThemeContext";
import Logo from "../../components/Logo";
import RecipeCard from "../../components/RecipeCard";
import { IRecipe } from "../../interfaces/recipe.interface";
import { router } from "expo-router";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export default function PesquisarReceitas() {
  const { colors } = useContext(themeContext);

  const [searchType, setSearchType] = useState<"ingredients" | "recipes">("ingredients");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [searchResults, setSearchResults] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filterLayout, setFilterLayout] = useState<LayoutRectangle | null>(null)
  const filterButtonRef = useRef<View>(null)

  const filterOptions = [
    "Sem Lactose",
    "Sem Glúten",
    "Light",
    "Vegetariano",
    "Vegano",
  ];

  const addIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const removeIngredient = (item: string) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  async function fetchByIngredients(ingredientsList: string[]) {
    if (!SPOONACULAR_API_KEY) {
      throw new Error("Chave da API Spoonacular não encontrada")
    }
    if (ingredientsList.length === 0) return []

    const ingredientsParam = ingredientsList.map((item) => item.trim()).join(",")
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      ingredientsParam
    )}&number=12&ranking=1&ignorePantry=true&apiKey=${SPOONACULAR_API_KEY}`

    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Erro de API Spoonacular: ${res.status} ${text}`)
    }

    //api devolve um array de receitas
    const data = (await res.json()) as any[]

    //mapeia o os itens do array recebido para a tipagem de IRecipe
    return data.map((r) => ({
      id: Number(r.id),
      title: String(r.title),
      image: r.image ? String(r.image) : ""
    })) as IRecipe[]
  }

  async function fetchByTitle(query: string) {
    if (!SPOONACULAR_API_KEY) {
      throw new Error("Chave da API Spoonacular não encontrada")
    }
    if (!query.trim()) return []

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query
    )}&number=12&addRecipeInformation=false&apiKey=${SPOONACULAR_API_KEY}`

    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Erro de API Spoonacular: ${res.status} ${text}`)
    }
    const json = await res.json()

    //mesma tratativa da função fetchByIngredients
    const results = (json.results ?? []) as any
    return results.map((r) => ({
      id: Number(r.id),
      title: String(r.title),
      image: r.image ? String(r.image) : "",
    })) as IRecipe[]
  }

  async function handleSearch() {
    setError(null)
    setLoading(true)
    setSearchResults([])

    try {
      let results: IRecipe[] = []
      if (searchType === "ingredients") {
        if (ingredients.length === 0) {
          setSearchResults([])
          setLoading(false)
          return
        }
        results = await fetchByIngredients(ingredients)
      } else {
        if (!recipeTitle.trim()) {
          setSearchResults([])
          setLoading(false)
          return
        }
        results = await fetchByTitle(recipeTitle)
      }
      setSearchResults(results.length ? results : [])
    } catch (err: any) {
      setError(err.message || "Erro na busca!")
    } finally {
      setLoading(false)
    }
  }

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    headerContainer: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      gap: 20,
      alignItems: "center",
      width: "100%",
    },
    toggleContainer: {
      flexDirection: "row",
      backgroundColor: "#ddd",
      borderRadius: 25,
      overflow: "hidden",
    },
    toggleButton: {
      height: 65,
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    activeButton: { backgroundColor: colors.darkBlue },
    activeText: { color: "white", fontWeight: "bold", fontSize: 12 },
    inactiveText: { color: "#555", fontSize: 12 },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#1E5C76",
      borderRadius: 25,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: "100%",
    },
    input: { flex: 1, paddingHorizontal: 10 },
    addButton: { paddingHorizontal: 6 },
    filterButton: { paddingHorizontal: 6 },
    searchButton: {
      backgroundColor: "#1E5C76",
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 6,
      marginLeft: 5,
    },
    searchText: { color: "white", fontWeight: "bold" },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 5,
      gap: 8,
      width: "100%",
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#e0e0e0",
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 4,
    },
    filterMenuOverlay: {
      position: "absolute",
      backgroundColor: "#4A6B82",
      borderRadius: 10,
      padding: 10,
      zIndex: 999,
      elevation: 5, // Android
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    filterItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
      gap: 8,
    },
    filterText: { color: "white" },
    noResults: {
      marginTop: 40,
      fontSize: 16,
      color: colors.darkBlue,
      fontWeight: "500",
      textAlign: "center",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeCard recipe={item} onPress={(recipe) => router.push(`../recipe/${recipe.id}`)} />}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 120 }}
        onScrollBeginDrag={() => setFiltersVisible(false)}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Logo />

            {/* Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  searchType === "ingredients" && styles.activeButton,
                ]}
                onPress={() => setSearchType("ingredients")}
              >
                <Text
                  style={
                    searchType === "ingredients"
                      ? styles.activeText
                      : styles.inactiveText
                  }
                >
                  Pesquisar por ingredientes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  searchType === "recipes" && styles.activeButton,
                ]}
                onPress={() => setSearchType("recipes")}
              >
                <Text
                  style={
                    searchType === "recipes"
                      ? styles.activeText
                      : styles.inactiveText
                  }
                >
                  Pesquisar por título
                </Text>
              </TouchableOpacity>
            </View>

            {/* Barra de busca */}
            {searchType === "ingredients" ? (
              <>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Insira os ingredientes"
                    value={ingredient}
                    onChangeText={setIngredient}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={addIngredient}
                  >
                    <Ionicons name="add" size={22} color="#1E5C76" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    ref={filterButtonRef}
                    style={styles.filterButton}
                    onPress={() => {
                      if (filterButtonRef.current) {
                        filterButtonRef.current.measure(
                          (fx, fy, width, height, px, py) => {
                            setFilterLayout({ x: px, y: py, width, height })
                            setFiltersVisible(!filtersVisible)
                          }
                        )
                      }
                    }}
                  >
                    <Ionicons name="filter" size={22} color="#1E5C76" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                  >
                    <Text style={styles.searchText}>Pesquisar</Text>
                  </TouchableOpacity>
                </View>

                {ingredients.length > 0 && (
                  <View style={styles.chipsContainer}>
                    {ingredients.map((item) => (
                      <View key={item} style={styles.chip}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => removeIngredient(item)}>
                          <Ionicons name="close" size={16} color="#555" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

              </>
            ) : (
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar receita"
                  value={recipeTitle}
                  onChangeText={setRecipeTitle}
                />
                <Ionicons name="search" size={20} color="#1E5C76" />
                <TouchableOpacity
                  ref={filterButtonRef}
                  style={styles.filterButton}
                  onPress={() => {
                    if (filterButtonRef.current) {
                      filterButtonRef.current.measure(
                        (fx, fy, width, height, px, py) => {
                          setFilterLayout({ x: px, y: py, width, height })
                          setFiltersVisible(!filtersVisible)
                        }
                      )
                    }
                  }}
                >
                  <Ionicons name="filter" size={22} color="#1E5C76" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleSearch}
                >
                  <Text style={styles.searchText}>Pesquisar</Text>
                </TouchableOpacity>
              </View>
            )}

            {searchResults.length === 0 && (
              <Text style={styles.noResults}>Nenhum resultado encontrado</Text>
            )}
          </View>
        }
      />

      {/* Filtros */}
      {filtersVisible && filterLayout && (
        <View style={[
          styles.filterMenuOverlay,
          {
            top: filterLayout.y + filterLayout.height,
            left: filterLayout.x,
          }
        ]}
        >
          {filterOptions.map((f) => {
            const selected = filters.includes(f);
            return (
              <TouchableOpacity
                key={f}
                style={styles.filterItem}
                onPress={() => toggleFilter(f)}
              >
                <Ionicons
                  name={selected ? "checkbox" : "square-outline"}
                  size={18}
                  color="white"
                />
                <Text style={styles.filterText}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

    </SafeAreaView>
  );
}
