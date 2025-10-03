import { IRecipe } from "../../../interfaces/recipe.interface";
import RecipeCard from "../../../components/RecipeCard";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import BookmarkButton from "../../../components/BookmarkButton";
import VoltarHeader from "../../../components/VoltarHeader";
import { useContext } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";

export default function LivroReceitas() {
  let receitasDemo: IRecipe[] = [
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
    mainLogo: {
      width: 210,
      height: 50,
      alignSelf: "center",
      marginTop: 60,
      marginBottom: 20,
    },

    main: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      gap: 130,
      paddingTop: 100,
      paddingBottom: 70,
    },

    tituloPagina: {
      color: colors.darkBlue,
      textAlign: "center",
      marginBottom: 20,
      fontSize: 30,
      fontWeight: "bold",
    },

    bookmarkButton: {
      fontSize: 50,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
  });

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <VoltarHeader />
        {/*         <Image
          source={require("../../../assets/logo.png")}
          style={styles.mainLogo}
        /> */}
        <Text style={styles.tituloPagina}>Livro de receitas</Text>
        {receitasDemo.map((receita) => (
          <View style={styles.row} key={receita.id}>
            <RecipeCard recipe={receita} />
            <BookmarkButton size={48} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
