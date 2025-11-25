import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-paper";
import VoltarHeader from "../../../components/VoltarHeader";
import { useContext, useState } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";
import { useFavorites } from "../../../hooks/useFavorites";
import { useRouter } from "expo-router";
import BookmarkButton from "../../../components/BookmarkButton";

export default function LivroReceitas() {
  const { colors } = useContext(themeContext);
  const router = useRouter();
  const {
    favorites,
    loading,
    refreshing,
    loadFavorites,
    toggleFavorite,
  } = useFavorites();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };

  const handleRemoveFavorite = async (
    e: any,
    recipeId: string,
    title: string,
    image: string
  ) => {
    e.stopPropagation();
    setRemovingId(recipeId);
    await toggleFavorite(recipeId, title, image);
    setRemovingId(null);
  };

  const handleRefresh = () => {
    loadFavorites(true);
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    content: {
      ...globalStyles.container,
      alignItems: "center",
      paddingBottom: 100,
      paddingTop: 10,
      paddingHorizontal: 20,
    },
    titulo: {
      ...globalStyles.tituloPagina,
      marginTop: 20,
      marginBottom: 20,
      color: colors.darkBlue,
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.darkBlue,
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 60,
      paddingHorizontal: 30,
    },
    emptyText: {
      fontSize: 16,
      color: colors.secondaryText || "#666",
      textAlign: "center",
      marginTop: 20,
      lineHeight: 24,
    },
    recipeList: {
      width: "100%",
      gap: 16,
    },
    recipeCard: {
      backgroundColor: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: 200,
    },
    recipeImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    favoriteButtonContainer: {
      position: "absolute",
      top: 12,
      right: 12,
    },
    recipeInfo: {
      padding: 16,
    },
    recipeTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.darkBlue,
      marginBottom: 8,
    },
    tapHint: {
      fontSize: 13,
      color: colors.secondaryText || "#666",
      fontStyle: "italic",
    },
  });

  // Loading inicial
  if (loading && favorites.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <VoltarHeader />
            <Text style={styles.titulo}>Livro de Receitas</Text>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.darkBlue} />
              <Text style={styles.loadingText}>Carregando receitas...</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.darkBlue]}
            tintColor={colors.darkBlue}
          />
        }
      >
        <View style={styles.content}>
          <VoltarHeader />

          <Text style={styles.titulo}>
            Livro de Receitas {favorites.length > 0 ? `(${favorites.length})` : ""}
          </Text>

          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon source="book-open-variant" size={100} color="#ccc" />
              <Text style={styles.emptyText}>
                Seu livro de receitas está vazio.{"\n"}
                Explore receitas e salve suas favoritas! 📖
              </Text>
            </View>
          ) : (
            <View style={styles.recipeList}>
              {favorites.map((receita) => (
                <TouchableOpacity
                  key={receita.recipeId}
                  style={styles.recipeCard}
                  onPress={() => handleRecipePress(receita.recipeId)}
                  activeOpacity={0.8}
                >
                  <View style={styles.imageContainer}>
                    {receita.recipeImage ? (
                      <Image
                        source={{ uri: receita.recipeImage }}
                        style={styles.recipeImage}
                      />
                    ) : (
                      <View
                        style={[
                          styles.recipeImage,
                          { backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" },
                        ]}
                      >
                        <Icon source="image-off" size={60} color="#ccc" />
                      </View>
                    )}
                    <View style={styles.favoriteButtonContainer}>
                      <BookmarkButton
                        isFavorite={true}
                        onPress={(e) =>
                          handleRemoveFavorite(
                            e,
                            receita.recipeId,
                            receita.title,
                            receita.recipeImage
                          )
                        }
                        loading={removingId === receita.recipeId}
                        size={28}
                      />
                    </View>
                  </View>

                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeTitle} numberOfLines={2}>
                      {receita.title}
                    </Text>
                    <Text style={styles.tapHint}>
                      Toque para ver a receita completa
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}