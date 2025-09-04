import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { themeContext } from "../context/ThemeContext";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Footer() {
  const { colors } = useContext(themeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.darkBlue,
      padding: 40,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    logoFooter: {
      width: 160,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },

    option: {
      fontWeight: "bold",
      color: "white",
    },

    footerOptions: {
      gap: 30,
    },

    column1: {
      gap: 60,
    },

    column2: {
      gap: 20,
      flexDirection: "row",
    },
  });

  return (
    <View testID="footer" style={styles.container}>
      <View testID="column1Footer" style={styles.column1}>
        <Image
          style={styles.logoFooter}
          source={require("../assets/whiteLogo.png")}
        />

        <View testID="footerOptions" style={styles.footerOptions}>
          <Link href={"#"} style={styles.option}>
            Início
          </Link>
          <Link href={"#"} style={styles.option}>
            Sobre
          </Link>
          <Link href={"#"} style={styles.option}>
            Contato
          </Link>
        </View>
      </View>

      <View testID="column2Footer" style={styles.column2}>
        <MaterialCommunityIcons name="instagram" size={26} color="white" />
        <MaterialCommunityIcons name="linkedin" size={26} color="white" />
        <MaterialCommunityIcons name="facebook" size={26} color="white" />
      </View>
    </View>
  );
}
