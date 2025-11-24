import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Text, Card, Avatar, Icon } from "react-native-paper";
import VoltarHeader from "../../../components/VoltarHeader";
import { globalStyles } from "../../../styles/globalStyles";
import { useContext, useEffect, useState } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { useAuth } from "../../_layout";
import { useRouter } from "expo-router";

const API_URL = "https://pi-3sem-backend.onrender.com";

interface UserReview {
  recipeId: string;
  title: string;
  recipeImage: string;
  date: Date;
  comment?: string;
  grade: number;
  imageBase64: string;
}

export default function VerComentarios() {
  const { colors } = useContext(themeContext);
  const { user, token } = useAuth();
  const router = useRouter();

  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const REVIEWS_PER_PAGE = 10;

  // Função para buscar reviews do usuário
  const fetchUserReviews = async (currentOffset: number, isLoadMore = false) => {
    if (!user || !token) {
      setError("Você precisa estar logado para ver seus comentários");
      setLoading(false);
      return;
    }

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(
        `${API_URL}/user/${user.id}/reviews?limit=${REVIEWS_PER_PAGE}&offset=${currentOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setReviews([]);
          setHasMore(false);
          return;
        }
        throw new Error(`Erro ao buscar comentários: ${response.status}`);
      }

      const data = await response.json();

      // Converte as datas e adiciona os reviews
      const fetchedReviews: UserReview[] = Array.isArray(data)
        ? data.map((review: any) => ({
            recipeId: review.recipeId,
            title: review.title || "Receita sem título",
            recipeImage: review.recipeImage || "",
            date: new Date(review.date),
            comment: review.comment || "",
            grade: review.grade,
            imageBase64: review.imageBase64 || "",
          }))
        : [];

      if (isLoadMore) {
        setReviews((prev) => [...prev, ...fetchedReviews]);
      } else {
        setReviews(fetchedReviews);
      }

      // Verifica se há mais reviews para carregar
      setHasMore(fetchedReviews.length === REVIEWS_PER_PAGE);
      setOffset(currentOffset);
    } catch (err: any) {
      console.error("Erro ao buscar reviews:", err);
      setError(err.message || "Erro ao carregar comentários");
      Alert.alert("Erro", "Não foi possível carregar seus comentários");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Carrega os reviews iniciais
  useEffect(() => {
    fetchUserReviews(0);
  }, []);

  // Função para carregar mais reviews
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const newOffset = offset + REVIEWS_PER_PAGE;
      fetchUserReviews(newOffset, true);
    }
  };

  // Função para formatar a data
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para navegar para a receita
  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    content: {
      paddingBottom: 100,
      paddingHorizontal: 20,
    },
    title: {
      ...globalStyles.tituloPagina,
      color: colors.darkBlue,
      textAlign: "center",
      marginVertical: 20,
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
    },
    noReviewsContainer: {
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    noReviewsText: {
      fontSize: 16,
      color: colors.secondaryText || "#666",
      textAlign: "center",
      fontStyle: "italic",
      lineHeight: 24,
    },
    reviewCard: {
      marginBottom: 16,
      elevation: 2,
      borderRadius: 12,
      overflow: "hidden",
    },
    recipeImageContainer: {
      width: "100%",
      height: 180,
      backgroundColor: "#f0f0f0",
    },
    recipeImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    cardContent: {
      padding: 16,
    },
    recipeTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.darkBlue,
      marginBottom: 8,
    },
    dateText: {
      fontSize: 14,
      color: colors.secondaryText || "#666",
      marginBottom: 12,
    },
    starsContainer: {
      flexDirection: "row",
      marginBottom: 12,
      gap: 4,
    },
    commentText: {
      fontSize: 15,
      color: "#333",
      lineHeight: 22,
      marginBottom: 12,
    },
    userImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginTop: 8,
    },
    loadMoreButton: {
      backgroundColor: colors.darkBlue,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 25,
      marginTop: 20,
      marginBottom: 20,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    loadMoreButtonDisabled: {
      backgroundColor: "#ccc",
    },
    loadMoreText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    allLoadedText: {
      textAlign: "center",
      fontSize: 14,
      color: colors.secondaryText || "#666",
      marginTop: 10,
      marginBottom: 20,
      fontStyle: "italic",
    },
    tapHint: {
      fontSize: 13,
      color: colors.secondaryText || "#666",
      textAlign: "center",
      marginTop: 8,
      fontStyle: "italic",
    },
  });

  // Loading inicial
  if (loading && reviews.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <VoltarHeader />
          <Text style={styles.title}>Seus Comentários</Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.darkBlue} />
            <Text style={styles.loadingText}>Carregando comentários...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Erro
  if (error && reviews.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <VoltarHeader />
          <Text style={styles.title}>Seus Comentários</Text>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <VoltarHeader />

        <Text style={styles.title}>
          Seus Comentários {reviews.length > 0 ? `(${reviews.length})` : ""}
        </Text>

        {reviews.length === 0 ? (
          <View style={styles.noReviewsContainer}>
            <Icon source="comment-off-outline" size={80} color="#ccc" />
            <Text style={styles.noReviewsText}>
              Você ainda não fez nenhum comentário.{"\n"}
              Experimente receitas e compartilhe sua opinião! 🌟
            </Text>
          </View>
        ) : (
          <>
            {reviews.map((review, index) => (
              <TouchableOpacity
                key={`${review.recipeId}-${index}`}
                onPress={() => handleRecipePress(review.recipeId)}
                activeOpacity={0.7}
              >
                <Card style={styles.reviewCard}>
                  {/* Imagem da receita */}
                  {review.recipeImage && (
                    <View style={styles.recipeImageContainer}>
                      <Image
                        source={{ uri: review.recipeImage }}
                        style={styles.recipeImage}
                      />
                    </View>
                  )}

                  <View style={styles.cardContent}>
                    {/* Título da receita */}
                    <Text style={styles.recipeTitle}>{review.title}</Text>

                    {/* Data */}
                    <Text style={styles.dateText}>
                      Comentado em: {formatDate(review.date)}
                    </Text>

                    {/* Estrelas */}
                    <View style={styles.starsContainer}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon
                          key={i}
                          source={i < review.grade ? "star" : "star-outline"}
                          size={22}
                          color={i < review.grade ? "#FFD700" : "#CCC"}
                        />
                      ))}
                    </View>

                    {/* Comentário */}
                    {review.comment && (
                      <Text style={styles.commentText}>{review.comment}</Text>
                    )}

                    {/* Imagem do usuário */}
                    {review.imageBase64 && (
                      <Image
                        source={{ uri: review.imageBase64 }}
                        style={styles.userImage}
                      />
                    )}

                    {/* Dica para tocar */}
                    <Text style={styles.tapHint}>
                      Toque para ver a receita completa
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}

            {/* Botão Carregar Mais */}
            {hasMore && (
              <TouchableOpacity
                style={[
                  styles.loadMoreButton,
                  loadingMore && styles.loadMoreButtonDisabled,
                ]}
                onPress={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.loadMoreText}>Carregando...</Text>
                  </>
                ) : (
                  <>
                    <Icon source="chevron-down" size={24} color="#fff" />
                    <Text style={styles.loadMoreText}>Carregar mais</Text>
                  </>
                )}
              </TouchableOpacity>
            )}

            {/* Mensagem de todos carregados */}
            {!hasMore && reviews.length > 0 && (
              <Text style={styles.allLoadedText}>
                Todos os comentários foram carregados! ✨
              </Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}