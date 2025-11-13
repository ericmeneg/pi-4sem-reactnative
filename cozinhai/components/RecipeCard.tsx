import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { IRecipe } from "../interfaces/recipe.interface";
import BookmarkButton from "./BookmarkButton";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

interface RecipeCardProps {
  recipe: IRecipe;
  onPress?: (recipe: IRecipe) => void;
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const { colors } = useContext(themeContext);
  const screenWidth = Dimensions.get("window").width;

  const CARD_WIDTH = screenWidth * 0.92;
  const IMAGE_SIZE = screenWidth * 0.22;

  const TITLE_FONT = 16; // tamanho padronizado, bom em todos os celulares

  const handlePress = () => onPress?.(recipe);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={[
        styles.card,
        { width: CARD_WIDTH, borderColor: colors.darkBlue }
      ]}
    >
      <Image
        source={{ uri: recipe.image }}
        style={[styles.image, { width: IMAGE_SIZE, height: IMAGE_SIZE }]}
      />

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.title,
            {
              fontSize: TITLE_FONT,
              lineHeight: TITLE_FONT * 1.2,
              color: colors.darkBlue,
            },
          ]}
          numberOfLines={2}
        >
          {recipe.title}
        </Text>

        <BookmarkButton size={24} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    marginVertical: 6,
  },

  image: {
    borderRadius: 12,
  },

  infoContainer: {
    flex: 1,
    marginLeft: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "600",
    flexShrink: 1,
    maxWidth: "75%",
  },
});
