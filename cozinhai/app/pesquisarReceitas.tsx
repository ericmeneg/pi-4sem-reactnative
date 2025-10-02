import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Logo from "../components/Logo";

// Dados de receitas de exemplo para mostrar o layout
const DUMMY_RECIPES = [
  {
    id: "1",
    title: "Tomate recheado com cenoura",
    image: "https://via.placeholder.com/200",
  },
  {
    id: "2",
    title: "Molho de tomate com cenoura",
    image: "https://via.placeholder.com/200",
  },
];

export default function PesquisarReceitas() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = (key) => () => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Atenção", "Digite algo para pesquisar!");
      return;
    }

    setIsLoading(true);
    setSearchResults([]);
    setHasSearched(false);

    try {
      // Simulação da busca de receitas com dados de exemplo
      setSearchResults(DUMMY_RECIPES);
      setHasSearched(true);
    } catch (error) {
      console.error("Erro na busca:", error);
      Alert.alert(
        "Erro",
        "Não foi possível buscar as receitas. Verifique sua conexão e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeCardWrapper}>
      <View style={styles.cardContentWrapper}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
        />
        <View style={styles.textAndButtonContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Pressable onPress={() => console.log("Ver receita")}>
            <LinearGradient
              colors={['#57CC99', '#22577A']}
              style={styles.gradientButton}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Text style={styles.buttonText}>Ver Receita</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Logo/> 
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.mainContent}>
          {/* Barra de Pesquisa */}
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder="Insira os ingredientes que você tem"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <Pressable onPress={handleSearch} style={styles.searchButton}>
              <LinearGradient
                colors={['#57CC99', '#22577A']}
                style={styles.gradientButtonSearch}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <FontAwesome name="search" size={20} color="#fff" />
                )}
              </LinearGradient>
            </Pressable>
            <Pressable
              onPress={() => setIsFilterVisible(!isFilterVisible)}
              style={styles.filterButton}
            >
              <LinearGradient
                colors={['#57CC99', '#22577A']}
                style={styles.gradientButtonFilter}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              >
                <FontAwesome name="filter" size={20} color="#fff" />
              </LinearGradient>
            </Pressable>
          </View>

          {/* Filtros */}
          {isFilterVisible && (
            <View style={styles.filtersContainer}>
              <View style={styles.filterItem}>
                <Pressable onPress={toggleFilter("dairyFree")}>
                  <View style={[styles.checkbox, filters.dairyFree && styles.checkboxChecked]} />
                </Pressable>
                <Text style={styles.filterText}>Sem Lactose</Text>
              </View>
              <View style={styles.filterItem}>
                <Pressable onPress={toggleFilter("glutenFree")}>
                  <View style={[styles.checkbox, filters.glutenFree && styles.checkboxChecked]} />
                </Pressable>
                <Text style={styles.filterText}>Sem Glúten</Text>
              </View>
              <View style={styles.filterItem}>
                <Pressable onPress={toggleFilter("vegetarian")}>
                  <View style={[styles.checkbox, filters.vegetarian && styles.checkboxChecked]} />
                </Pressable>
                <Text style={styles.filterText}>Vegetariano</Text>
              </View>
              <View style={styles.filterItem}>
                <Pressable onPress={toggleFilter("vegan")}>
                  <View style={[styles.checkbox, filters.vegan && styles.checkboxChecked]} />
                </Pressable>
                <Text style={styles.filterText}>Vegano</Text>
              </View>
            </View>
          )}

          {/* Resultados da Pesquisa */}
          {(isLoading || hasSearched) && (
            <View style={styles.searchResultsContainer}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#22577A"
                  style={{ marginTop: 20 }}
                />
              ) : searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  renderItem={renderRecipe}
                  keyExtractor={(item) => item.id}
                  numColumns={1}
                  contentContainerStyle={styles.listContainer}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                hasSearched && (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      Nenhuma receita encontrada.
                    </Text>
                    <Text style={styles.emptySubtext}>
                      Tente buscar por outros nomes.
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer de navegação */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/")} style={styles.footerItem}>
          <AntDesign name="home" size={24} color="white" />
          <Text style={styles.footerText}>Home</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/pesquisarReceitas")} style={styles.footerItem}>
          <FontAwesome name="search" size={24} color="white" />
          <Text style={styles.footerText}>Busca por título</Text>
        </Pressable>
        <Pressable onPress={() => router.push("#")} style={styles.footerItem}>
          <MaterialCommunityIcons name="shopping" size={24} color="white" />
          <Text style={styles.footerText}>Busca por lista</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/profile")} style={styles.footerItem}>
          <MaterialCommunityIcons name="account" size={24} color="white" />
          <Text style={styles.footerText}>Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flex: 1,
  },
  mainContent: {
    padding: 81,
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  searchButton: {
    padding: 0, // Remova o padding do Pressable
    marginLeft: 10,
    borderRadius: 8,
    overflow: 'hidden', // Importante para que o gradiente respeite as bordas arredondadas
  },
  gradientButtonSearch: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    padding: 0, // Remova o padding do Pressable
    marginLeft: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButtonFilter: {
    padding: 10, // Adicione o padding ao gradiente
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    position: "absolute",
    right: 20,
    top: 60,
    backgroundColor: "#D9E3E9",
    borderRadius: 10,
    padding: 15,
    zIndex: 1,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#22577A",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#22577A",
  },
  searchResultsContainer: {
    width: "100%",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#665",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
  listContainer: {
    paddingBottom: 20,
  },
  recipeCardWrapper: {
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textAndButtonContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  gradientButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#22577A",
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});