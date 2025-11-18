import { IRecipe } from "../../../interfaces/recipe.interface";
import RecipeCard from "../../../components/RecipeCard";
import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import VoltarHeader from "../../../components/VoltarHeader";
import { useContext, useEffect, useState } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";
import { useAuth } from "../../_layout";
import { router } from "expo-router";

const SPOONACULAR_API_KEY = ""

async function getFavoriteRecipes(userId, token, limit, offSet) {
  try {
    const response = await fetch(
      `https://pi-3sem-backend.onrender.com/user/${userId}/favorites?limit=${limit}&offset=${offSet}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Chamada a rota da API de backend /user/userId/favorites falhou")
    }
    const favorites = await response.json()
    return favorites
  } catch (error) {
    console.error(error);
    return []
  }
}

export default function LivroReceitas() {
  const { user, token } = useAuth()
  const [favoritos, setFavoritos] = useState<IRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  async function loadFavoritos() {
    setLoading(true)
    setErrorMessage("")

    try {
      const favIds = await getFavoriteRecipes(user.id, token, 10, 0)

      if (!Array.isArray(favIds)) {
        throw new Error("Retorno inesperado da API de backend")
      }

      if (!favIds.length) {
        setFavoritos([])
        return
      }

      const idsString = favIds.map(f => f.recipeId).join(",")

      const spoonacularRes = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${idsString}&apiKey=${SPOONACULAR_API_KEY}`
      )

      if (!spoonacularRes.ok) {
        throw new Error("Erro ao buscar as receitas da API Spoonacular")
      }

      const recipes = await spoonacularRes.json()

      if (!Array.isArray(recipes)) {
        throw new Error("Spoonacular retornou dados inválidos")
      }
      setFavoritos(recipes)
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error)
      setErrorMessage("Não foi possível carregar suas receitas favoritas. Pode ser que o servidor esteja iniciando, tente novamente daqui a um minuto.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadFavoritos() }, [])

  const { colors } = useContext(themeContext);

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
    },

    titulo: {
      ...globalStyles.tituloPagina,
      marginTop: 20,
      marginBottom: 20,
      color: colors.darkBlue,
      textAlign: "center",
    },

    recipeList: {
      width: "100%",
      alignItems: "center",
      gap: 20,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Carregando receitas... {"(pode demorar um pouco)"}</Text>
      </SafeAreaView>
    )
  }
  if (errorMessage) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center", marginBottom: 20 }}>
          {errorMessage}
        </Text>
        <Text
          style={{ color: colors.darkBlue, textDecorationLine: "underline" }}
          onPress={loadFavoritos}>
          Tentar novamente
        </Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <VoltarHeader />
          <Text style={styles.titulo}>Livro de Receitas</Text>
          <View style={styles.recipeList}>
            {favoritos.map((receita) => (
              <RecipeCard key={receita.id} recipe={receita} onPress={(recipe) => router.push(`../../recipe/${recipe.id}`)} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
