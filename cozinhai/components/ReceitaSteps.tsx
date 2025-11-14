import { useContext } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { themeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IRecipe } from "../interfaces/recipe.interface";
import IIngredients from "../interfaces/ingredient.interface";

interface ReceitaStepsProps {
  recipe: IRecipe
}

export default function ReceitaSteps({ recipe }: ReceitaStepsProps) {
  const { colors } = useContext(themeContext);
  const styles = StyleSheet.create({
    container: {
      gap: 30,
    },

    ingredientDiv: {
      gap: 5,
      flexDirection: "row",
      paddingLeft: 20,
    },

    descText: {
      color: colors.darkBlue,
      paddingLeft: 12,
    },

    ingredient: {
      flexDirection: "row",
      gap: 2,
      paddingLeft: 15,
    },

    title: {
      fontWeight: "bold",
      color: colors.darkBlue,
    },

    section: {
      gap: 10,
    },
  });

  return (
    <View testID="container" style={styles.container}>

      {recipe.extendedIngredients?.length > 0 && (
        <View testID="ingredientsSection" style={styles.section}>
          <Text style={styles.title}>Ingredientes</Text>

          {recipe.extendedIngredients.map((ingredient: IIngredients) => (
            <View
              key={ingredient.id}
              testID="ingredient"
              style={styles.ingredient}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="circle-medium"
                  style={{ color: colors.darkBlue }}
                />
              </View>

              <Text style={{ color: colors.darkBlue }}>
                {ingredient.amount}{" "}
                {ingredient.unit ? ingredient.unit : ""} {ingredient.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {recipe.instructions && (
        <View testID="stepsSection" style={styles.section}>
          <Text style={styles.title}>Modo de Preparo</Text>
          <Text>{recipe.instructions}</Text>
        </View>
      )}
    </View>
  )
}