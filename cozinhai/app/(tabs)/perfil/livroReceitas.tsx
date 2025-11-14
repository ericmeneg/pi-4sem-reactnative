import { IRecipe } from "../../../interfaces/recipe.interface";
import RecipeCard from "../../../components/RecipeCard";
import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import VoltarHeader from "../../../components/VoltarHeader";
import { useContext } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";

export default function LivroReceitas() {
  const receitasDemo: IRecipe[] = [
    {
      id: 648348,
      title: "Jalapeno Cornbread Stuffing",
      image: "https://img.spoonacular.com/recipes/648348-556x370.jpg",
    },
    {
      id: 796873,
      title: "Yogurt Parfait",
      image: "https://img.spoonacular.com/recipes/796873-556x370.jpg",
    },
    {
      id: 634965,
      title: "Bibimbab (Korean Rice w Vegetables & Beef)",
      image: "https://img.spoonacular.com/recipes/634965-556x370.jpg",
    },
    {
      id: 633668,
      title: "Baked Lemon~Lime Chicken Wings",
      image: "https://img.spoonacular.com/recipes/633668-556x370.jpg",
    },
    {
      id: 642138,
      title: "Easy Vegetable Fried Rice",
      image: "https://img.spoonacular.com/recipes/642138-556x370.jpg",
    },
    {
      id: 635345,
      title: "Blue Cheese and Mushroom Turkey Burger",
      image: "https://img.spoonacular.com/recipes/635345-556x370.jpg",
    },
  ];

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
            {receitasDemo.map((receita) => (
              <RecipeCard key={receita.id} recipe={receita} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
