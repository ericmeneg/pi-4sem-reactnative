import { Image, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import ReceitaInfo from "../components/ReceitaInfo";

export default function Receita() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.main} testID="main">
        <Image source={require("../assets/logo.png")} style={styles.mainLogo} />

        <View testID="receitaDiv">
          <View testID="receitaHeader" style={styles.receitaHeader}>
            <Image source={require("../assets/churros.png")}></Image>
            <ReceitaInfo />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 120,
  },

  mainLogo: {
    width: 210,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  main: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    gap: 130,
  },

  receitaHeader: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
});
