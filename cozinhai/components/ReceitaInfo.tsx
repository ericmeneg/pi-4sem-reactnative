import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ReceitaInfo() {
  const { colors } = useContext(themeContext);

  const styles = StyleSheet.create({
    container: {
      alignItems: "flex-start",
      gap: 20,
    },

    title: {
      color: colors.darkBlue,
      fontWeight: "bold",
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
      <Text style={styles.title}>Título Da Receita</Text>

      <View testID="receitaInfoDesc" style={styles.receitaInfoDesc}>
        <View testID="receitaInfoItem1" style={styles.receitaInfoItem}>
          <MaterialCommunityIcons
            name="account"
            size={26}
            color={colors.darkBlue}
          />
          <Text style={styles.subTitleLow}>Serve X Pessoas</Text>
        </View>

        <View testID="receitaInfoItem2" style={styles.receitaInfoItem}>
          <MaterialCommunityIcons
            name="pot-steam-outline"
            size={26}
            color={colors.darkBlue}
          />
          <Text style={styles.subTitleLow}>Vai ao Fogo</Text>
        </View>

        <View testID="receitaInfoItem3" style={styles.receitaInfoItem}>
          <MaterialCommunityIcons
            name="clock-time-eight-outline"
            size={26}
            color={colors.darkBlue}
          />
          <Text style={styles.subTitleLow}>X Minutos</Text>
        </View>
      </View>
    </View>
  );
}
