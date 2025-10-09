import React, { useContext, useState } from "react";
import {
    ScrollView,
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
import RecipeCard from "../../components/RecipeCard"; // ajuste o caminho conforme seu projeto
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

    // Adiciona ingrediente digitado
    const addIngredient = () => {
        if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient("");
        }
    };

    // Remove ingrediente individual
    const removeIngredient = (item: string) => {
        setIngredients(ingredients.filter((i) => i !== item));
    };

    // Alterna estado do filtro
    const toggleFilter = (filter: string) => {
        setFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    };

    // Mock de resultados (será substituído pela API)
    const mockRecipes: IRecipe[] = [
        {
            _id: "1",
            title: "Bolo de Cenoura com Cobertura de Chocolate",
            image: "https://images.unsplash.com/photo-1605475128023-715f8b1e0b7e",
        },
        {
            _id: "2",
            title: "Salada Mediterrânea",
            image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
        },
        {
            _id: "3",
            title: "Lasanha de Berinjela",
            image: "https://images.unsplash.com/photo-1617196035369-8b9e0f2cb3ac",
        },
    ];

    // Simula uma busca (mock)
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
        scrollViewContent: { flexGrow: 1, paddingBottom: 120 },
        mainContent: {
            paddingVertical: 20,
            paddingHorizontal: 20,
            gap: 20,
            alignItems: "center",
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
        activeButton: { backgroundColor: colors.darkBlue || "#1E5C76" },
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
            marginTop: 10,
            gap: 8,
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
            position: "absolute",
            top: 50,
            right: 30,
            backgroundColor: "#4A6B82",
            borderRadius: 10,
            padding: 10,
            zIndex: 10,
        },
        filterItem: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 4,
            gap: 8,
        },
        filterText: { color: "white" },
        resultsContainer: {
            width: "100%",
            alignItems: "center",
            marginTop: 20,
        },
        noResults: {
            marginTop: 40,
            fontSize: 16,
            color: colors.darkBlue,
            fontWeight: "500",
        },
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollViewContent}
                contentContainerStyle={styles.mainContent}
            >
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
                            <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
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

                {/* Resultados */}
                <View style={styles.resultsContainer}>
                    {searchResults.length > 0 ? (
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => <RecipeCard recipe={item} />}
                            contentContainerStyle={{ alignItems: "center" }}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Text style={styles.noResults}>Nenhum resultado encontrado</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
