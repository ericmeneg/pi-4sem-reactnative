import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IRecipe } from "../interfaces/recipe.interface";
import { useFavorites } from "../hooks/useFavorites";
import BookmarkButton from "./BookmarkButton";
import { useState } from "react";

interface RecipeCardProps {
  recipe: IRecipe;
  onPress?: (recipe: IRecipe) => void;
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);

  const handleFavoritePress = async (e: any) => {
    e.stopPropagation();
    setLoading(true);
    await toggleFavorite(recipe.id, recipe.title, recipe.image);
    setLoading(false);
  };

  const handleCardPress = () => {
    if (onPress) {
      onPress(recipe);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.favoriteButtonContainer}>
          <BookmarkButton
            isFavorite={isFavorite(recipe.id)}
            onPress={handleFavoritePress}
            loading={loading}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
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
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  favoriteButtonContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22577A",
  },
});