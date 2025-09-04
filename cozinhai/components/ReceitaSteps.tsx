import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { themeContext } from "../context/ThemeContext";
import { List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ReceitaSteps() {
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
      <View testID="ingredientsSection" style={styles.section}>
        <Text style={styles.title}>Ingredientes</Text>
        <View testID="ingredient" style={styles.ingredient}>
          <View style={[{ alignItems: "center", justifyContent: "center" }]}>
            <MaterialCommunityIcons
              name="circle-medium"
              style={{ color: colors.darkBlue }}
            />
          </View>
          <Text style={{ color: colors.darkBlue }}>Ingredient1</Text>
        </View>
      </View>

      <View testID="stepsSection" style={styles.section}>
        <Text style={styles.title}>Modo de Preparo</Text>
        <Text style={styles.descText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit:
        </Text>
      </View>
    </View>
  );
}
