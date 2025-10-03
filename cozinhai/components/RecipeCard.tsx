import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { IRecipe } from "../interfaces/recipe.interface";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import BookmarkButton from "./BookmarkButton";

interface RecipeCardProps {
  recipe: IRecipe;
  onPress?: (recipe: IRecipe) => void; // Adicione esta linha
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
    const handlePress = () => {
        if (onPress) {
            onPress(recipe);
        } else {
        }
    };

    return (
        <Card onPress={()=>{}} mode="elevated" elevation={5} style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    {recipe.title} {"\n"} <BookmarkButton size={30}/>
                </Text>
            </Card.Content>
        </Card>
    );
}

const { colors } = useContext(themeContext)

  const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 12,
      alignItems: "center",
      width: "90%",
      maxWidth: 350,
      backgroundColor: "transparent",
      borderColor: colors.darkBlue,
      borderWidth: 2,
      padding: 20,
    },

    cardContent: {
      gap: 20,
    },

    title: {
      textAlign: "center",
      color: colors.darkBlue,
      fontWeight: "bold",
    },
  });

  // return (
  //   <Card style={styles.card}>
  //     <Card.Content style={styles.cardContent}>
  //       <Card.Cover source={{ uri: recipe.image }} />
  //       <Text variant="titleMedium" testID="recipeTitle" style={styles.title}>
  //         {recipe.title}
  //       </Text>
  //     </Card.Content>
  //   </Card>
  // );
  //}

