import { Image, ScrollView, StyleSheet, View } from "react-native";
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
            <Image
              source={require("../assets/churros.png")}
              style={{ width: 130, height: 130 }}
            ></Image>
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
    justifyContent: "center",
    flexDirection: "column",
    gap: 130,
    paddingTop: 100,
  },

  receitaHeader: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "space-around",
  },

  receitaDiv: {
    gap: 40,
    padding: 20,
    paddingBottom: 180,
  },
});
