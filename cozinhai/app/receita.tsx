import { Image, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

export default function Receita() {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Image source={require("../assets/logo.png")} style={styles.mainLogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mainLogo: {
    width: 200,
    height: 50,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    top: 150,
  },
  main: {
    flex: 1,
    width: 600,
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
});
