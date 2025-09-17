import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { themeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function () {
  const { colors } = useContext(themeContext);
  const styles = StyleSheet.create({
    navBar: {
      backgroundColor: colors.darkBlue,
      height: 110,
      width: 420,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
      position: "absolute",
      bottom: 0,
      paddingTop: 15,
    },

    navItem: {
      alignItems: "center",
      width: 80,
    },

    navItemText: {
      color: colors.cardBackground,
      textAlign: "center",
      fontWeight: "semibold",
    },
  });

  return (
    <View testID="NavBar" style={styles.navBar}>
      <View testID="NavBarItem" style={styles.navItem}>
        <MaterialCommunityIcons
          name="home"
          color={colors.cardBackground}
          size={30}
        />
        <Text style={styles.navItemText}>Home</Text>
      </View>
      <View testID="NavBarItem" style={styles.navItem}>
        <MaterialCommunityIcons
          name="magnify"
          color={colors.cardBackground}
          size={30}
        />
        <Text style={styles.navItemText}>Buscar por título</Text>
      </View>
      <View testID="NavBarItem" style={styles.navItem}>
        <MaterialCommunityIcons
          name="playlist-edit"
          color={colors.cardBackground}
          size={30}
        />
        <Text style={styles.navItemText}>Buscar por lista</Text>
      </View>
      <View testID="NavBarItem" style={styles.navItem}>
        <MaterialCommunityIcons
          name="account"
          color={colors.cardBackground}
          size={30}
        />
        <Text style={styles.navItemText}>Perfil</Text>
      </View>
    </View>
  );
}
