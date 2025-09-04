import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import ReceitaInfo from "../components/ReceitaInfo";
import ReceitaSteps from "../components/ReceitaSteps";

export default function Receita() {
  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.main} testID="main">
        <Image source={require("../assets/logo.png")} style={styles.mainLogo} />

        <View testID="receitaDiv" style={styles.receitaDiv}>
          <View testID="receitaHeader" style={styles.receitaHeader}>
            <Image source={require("../assets/churros.png")}></Image>
            <ReceitaInfo />
          </View>
          <ReceitaSteps />
        </View>
      </View>
    </ScrollView>
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
    paddingTop: 100,
  },

  receitaHeader: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },

  receitaDiv: {
    gap: 40,
  },
});
