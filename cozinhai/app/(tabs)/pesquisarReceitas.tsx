import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themeContext } from "../../context/ThemeContext";
import Logo from "../../components/Logo";
import RecipeCard from "../../components/RecipeCard";
import { IRecipe } from "../../interfaces/recipe.interface";

export default function PesquisarReceitas() {
  const { colors } = useContext(themeContext);

  const [searchType, setSearchType] = useState<"ingredients" | "recipes">(
    "ingredients"
  );
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [searchResults, setSearchResults] = useState<IRecipe[]>([]);

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

  const mockRecipes: IRecipe[] = [
    {
      id: 1,
      title: "Bolo de Cenoura com Cobertura de Chocolate",
      image:
        "https://images.unsplash.com/photo-1641640267000-320d420711c9?q=80&w=1025&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Salada Mediterrânea",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
    },
    {
      id: 3,
      title: "Lasanha de Berinjela",
      image:
        "https://plus.unsplash.com/premium_photo-1671559021019-0268c54511b8?q=80&w=687&auto=format",
    },
  ];

  const handleSearch = () => {
    if (searchType === "ingredients" && ingredients.length > 0) {
      setSearchResults(mockRecipes);
    } else if (searchType === "recipes" && recipeTitle.trim()) {
      setSearchResults(mockRecipes);
    } else {
      setSearchResults([]);
    }
  };

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
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    activeButton: { backgroundColor: colors.darkBlue },
    activeText: { color: "white", fontWeight: "bold" },
    inactiveText: { color: "#555" },
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
    filterMenu: {
      backgroundColor: "#4A6B82",
      borderRadius: 10,
      padding: 10,
      marginTop: -10,
      width: "80%",
      alignSelf: "flex-end",
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
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 120 }}
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
                    style={styles.filterButton}
                    onPress={() => setFiltersVisible(!filtersVisible)}
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
                  style={styles.filterButton}
                  onPress={() => setFiltersVisible(!filtersVisible)}
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

            {/* Filtros */}
            {filtersVisible && (
              <View style={styles.filterMenu}>
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

            {searchResults.length === 0 && (
              <Text style={styles.noResults}>Nenhum resultado encontrado</Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}
