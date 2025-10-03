import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { themeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { globalStyles } from "../styles/globalStyles";

export default function VoltarHeader() {
  const { colors } = useContext(themeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 70,
        width: "100%",
        justifyContent: "flex-start",
        paddingHorizontal: 30,
      }}
    >
      <Link href="../">
        <MaterialCommunityIcons
          name="arrow-left"
          size={34}
          color={colors.darkBlue}
        />
      </Link>

      <Image
        source={require("../assets/logo.png")}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />
    </View>
  );
}
