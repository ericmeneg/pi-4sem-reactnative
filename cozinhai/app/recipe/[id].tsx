import { useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import ReceitaInfo from "../../components/ReceitaInfo";
import ReceitaSteps from "../../components/ReceitaSteps";
import { IComment } from "../../interfaces/comment.interface";
import { Card, Icon, Text, Avatar } from "react-native-paper";
import Logo from "../../components/Logo";
import { IRecipe } from "../../interfaces/recipe.interface";
import { useEffect, useState, useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import VoltarHeader from "../../components/VoltarHeader";
import FormularioComentario from "../../components/FormularioComentario";
import BookmarkButton from "../../components/BookmarkButton";
import { useFavorites } from "../../hooks/useFavorites";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const API_URL = "https://pi-3sem-backend.onrender.com";

interface ReviewFromAPI {
  userId: string;
  date: string;
  comment: string;
  grade: number;
  imageBase64?: string;
}

async function fetchRecipe(id: string | string[]): Promise<IRecipe | null> {
  try {
    if (!SPOONACULAR_API_KEY) {
      console.error("API Key não configurada");
      return null;
    }

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    const recipe: IRecipe = {
      id: data.id,
      title: data.title,
      image: data.image,
      ...(data.readyInMinutes && { readyInMinutes: data.readyInMinutes }),
      ...(data.servings && { servings: data.servings }),
      ...(data.extendedIngredients && {
        extendedIngredients: data.extendedIngredients,
      }),
      ...(data.instructions && { instructions: data.instructions }),
    };

    console.log("✅ Receita carregada:", recipe.title);
    return recipe;
  } catch (error) {
    console.error("❌ Erro ao buscar receita:", error);
    return null;
  }
}

async function fetchReviews(
  recipeId: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ reviews: IComment[]; hasMore: boolean }> {
  try {
    const response = await fetch(
      `${API_URL}/recipe/${recipeId}/reviews?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log("ℹ️ Nenhum review encontrado para esta receita");
        return { reviews: [], hasMore: false };
      }
      throw new Error(`Erro ao buscar reviews: ${response.status}`);
    }

    const data = await response.json();
    
    const reviews: IComment[] = Array.isArray(data)
      ? data.map((review: ReviewFromAPI) => ({
          userId: review.userId,
          date: new Date(review.date),
          comment: review.comment || "",
          grade: review.grade,
          imageBase64: review.imageBase64 || "",
        }))
      : [];

    console.log("✅ Reviews carregados:", reviews.length);

    const hasMore = reviews.length === limit;

    return { reviews, hasMore };
  } catch (error) {
    console.error("❌ Erro ao buscar reviews:", error);
    return { reviews: [], hasMore: false };
  }
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function Receita() {
  const { id } = useLocalSearchParams();
  const { colors } = useContext(themeContext);
  const { isFavorite, toggleFavorite } = useFavorites();

  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [reviews, setReviews] = useState<IComment[]>([]);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingMoreReviews, setLoadingMoreReviews] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const REVIEWS_PER_PAGE = 10;

  useEffect(() => {
    async function loadRecipe() {
      try {
        setLoadingRecipe(true);
        setError(null);
        const data = await fetchRecipe(id as string);
        
        if (!data) {
          setError("Não foi possível carregar a receita");
        } else {
          setRecipe(data);
        }
      } catch (err) {
        console.error("Erro ao carregar receita:", err);
        setError("Erro ao carregar a receita");
      } finally {
        setLoadingRecipe(false);
      }
    }
    
    if (id) {
      loadRecipe();
    }
  }, [id]);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoadingReviews(true);
        const { reviews: fetchedReviews, hasMore } = await fetchReviews(
          id as string,
          REVIEWS_PER_PAGE,
          0
        );
        setReviews(fetchedReviews);
        setHasMoreReviews(hasMore);
        setOffset(0);
      } catch (err) {
        console.error("Erro ao carregar reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    }

    if (id && !loadingRecipe) {
      loadReviews();
    }
  }, [id, loadingRecipe]);

  const loadMoreReviews = async () => {
    if (loadingMoreReviews || !hasMoreReviews) return;

    try {
      setLoadingMoreReviews(true);
      const newOffset = offset + REVIEWS_PER_PAGE;
      
      const { reviews: moreReviews, hasMore } = await fetchReviews(
        id as string,
        REVIEWS_PER_PAGE,
        newOffset
      );

      setReviews((prev) => [...prev, ...moreReviews]);
      setOffset(newOffset);
      setHasMoreReviews(hasMore);
    } catch (err) {
      console.error("Erro ao carregar mais reviews:", err);
      Alert.alert("Erro", "Não foi possível carregar mais comentários");
    } finally {
      setLoadingMoreReviews(false);
    }
  };

  const handleFavoritePress = async () => {
    if (!recipe) return;
    
    setLoadingFavorite(true);
    await toggleFavorite(recipe.id, recipe.title, recipe.image);
    setLoadingFavorite(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 100,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.darkBlue,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: "#DC2626",
      textAlign: "center",
      marginBottom: 20,
    },
    main: {
      alignItems: "center",
      paddingTop: 25,
      paddingHorizontal: 16,
      gap: 20,
      paddingBottom: 40,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 10,
    },
    receitaHeader: {
      flexDirection: "row",
      gap: 30,
      alignItems: "center",
      justifyContent: "space-around",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    imageContainer: {
      position: "relative",
    },
    favoriteButtonContainer: {
      position: "absolute",
      top: 8,
      right: 8,
    },
    receitaDiv: {
      gap: 40,
      padding: 20,
      width: "100%",
    },
    reviewsSection: {
      width: "100%",
      gap: 12,
      marginTop: 20,
    },
    reviewsTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.darkBlue,
      marginBottom: 10,
      textAlign: "center",
    },
    reviewCard: {
      width: "100%",
      marginBottom: 12,
      elevation: 2,
    },
    reviewImage: {
      width: 100,
      height: 100,
      borderRadius: 6,
      marginTop: 8,
    },
    starsContainer: {
      flexDirection: "row",
      marginTop: 6,
      justifyContent: "center",
    },
    loadMoreButton: {
      backgroundColor: colors.darkBlue,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginTop: 10,
      alignSelf: "center",
    },
    loadMoreButtonDisabled: {
      backgroundColor: "#ccc",
    },
    loadMoreText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    noReviewsText: {
      textAlign: "center",
      fontSize: 16,
      color: colors.secondaryText || "#666",
      fontStyle: "italic",
      marginTop: 20,
    },
    allLoadedText: {
      textAlign: "center",
      fontSize: 14,
      color: colors.secondaryText || "#666",
      marginTop: 10,
      fontStyle: "italic",
    },
  });

  if (loadingRecipe) {
    return (
      <ScrollView style={styles.container}>
        <Logo />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.darkBlue} />
          <Text style={styles.loadingText}>Carregando receita...</Text>
        </View>
      </ScrollView>
    );
  }

  if (error || !recipe) {
    return (
      <ScrollView style={styles.container}>
        <Logo />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || "Receita não encontrada"}
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Logo />
        
        <View style={styles.headerRow}>
          <VoltarHeader />
          <BookmarkButton
            isFavorite={isFavorite(recipe.id)}
            onPress={handleFavoritePress}
            loading={loadingFavorite}
            size={32}
          />
        </View>

        <View style={styles.receitaDiv}>
          <View style={styles.receitaHeader}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: recipe.image }}
                style={{ width: 130, height: 130, borderRadius: 8 }}
              />
            </View>
            <ReceitaInfo recipe={recipe} />
          </View>

          <ReceitaSteps recipe={recipe} />
        </View>

        <View style={styles.reviewsSection}>
          <FormularioComentario recipe={recipe} />
          <Text style={styles.reviewsTitle}>
            Avaliações {reviews.length > 0 ? `(${reviews.length})` : ""}
          </Text>

          {loadingReviews ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" color={colors.darkBlue} />
              <Text style={styles.loadingText}>Carregando avaliações...</Text>
            </View>
          ) : reviews.length === 0 ? (
            <Text style={styles.noReviewsText}>
              Ainda não há avaliações para esta receita.{"\n"}
              Seja o primeiro a avaliar! 🌟
            </Text>
          ) : (
            <>
              {reviews.map((review, index) => (
                <Card key={index} style={styles.reviewCard}>
                  <Card.Content>
                    <Card.Title
                      title={`Usuário ${review.userId.substring(0, 8)}`}
                      subtitle={formatDate(review.date)}
                      left={() => (
                        <Avatar.Icon
                          icon="account"
                          size={48}
                          style={{
                            backgroundColor: "teal",
                            marginLeft: -10,
                          }}
                        />
                      )}
                    />
                    {review.comment && <Text>{review.comment}</Text>}
                    <View style={{ alignItems: "center", marginTop: 8 }}>
                      <View style={styles.starsContainer}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Icon
                            key={i}
                            source={i < review.grade ? "star" : "star-outline"}
                            size={20}
                            color={i < review.grade ? "#22577A" : "#CCC"}
                          />
                        ))}
                      </View>
                      {review.imageBase64 && (
                        <Image
                          style={styles.reviewImage}
                          source={{ uri: review.imageBase64 }}
                        />
                      )}
                    </View>
                  </Card.Content>
                </Card>
              ))}

              {hasMoreReviews && (
                <TouchableOpacity
                  style={[
                    styles.loadMoreButton,
                    loadingMoreReviews && styles.loadMoreButtonDisabled,
                  ]}
                  onPress={loadMoreReviews}
                  disabled={loadingMoreReviews}
                >
                  {loadingMoreReviews ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.loadMoreText}>
                      Carregar mais avaliações
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              {!hasMoreReviews && reviews.length > 0 && (
                <Text style={styles.allLoadedText}>
                  Todas as avaliações foram carregadas! ✨
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}