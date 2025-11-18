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
  useEffect(()=>{
    async function loadFavoritos () {
      const favIds = await getFavoriteRecipes(user.id, token, 10, 0)

      if (!favIds.length){
        setFavoritos([])
        return
      }

      const idsString = favIds.map(f => f.recipeId).join(",")

      const spoonacularRes = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${idsString}&apiKey=${SPOONACULAR_API_KEY}`
      )

      const recipes = await spoonacularRes.json()
      setFavoritos(recipes)
    }

    loadFavoritos()
  }, [])

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
