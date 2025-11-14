import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IRecipe } from "../interfaces/recipe.interface";

interface ReceitaInfoProps {
  recipe: IRecipe
}

export default function ReceitaInfo({ recipe }: ReceitaInfoProps) {
  const { colors } = useContext(themeContext);

  const styles = StyleSheet.create({
    container: {
      alignItems: "flex-start",
      gap: 20,
    },

    title: {
      color: colors.darkBlue,
      fontWeight: "bold",
      fontSize: 20,
    },

    subTitleLow: {
      color: colors.darkBlue,
      opacity: 0.6,
    },

    receitaInfoDesc: {
      gap: 10,
      justifyContent: "center",
    },

    receitaInfoItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  });

  return (
    <View testID="container" style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>

      {recipe.servings && (
        <View testID="receitaInfoDesc" style={styles.receitaInfoDesc}>
          <View testID="receitaInfoItem1" style={styles.receitaInfoItem}>
            <MaterialCommunityIcons
              name="account"
              size={26}
              style={styles.subTitleLow}
            />
            <Text style={styles.subTitleLow}>
              Serve {recipe.servings} Pessoas
            </Text>
          </View>
        </View>
      )}


      {recipe.readyInMinutes && (
        <View testID="receitaInfoItem3" style={styles.receitaInfoItem}>
          <MaterialCommunityIcons
            name="clock-time-eight-outline"
            size={26}
            style={styles.subTitleLow}
          />
          <Text style={styles.subTitleLow}>Pronto em {recipe.readyInMinutes} Minutos</Text>
        </View>)
}
    </View >
  );
}
