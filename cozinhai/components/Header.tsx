import { Linking, Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useContext, createContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button } from "react-native-paper";

export default function Header() {
  const { colors } = useContext(themeContext);
  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { backgroundColor: colors.headerBackground }]}
      >
        <TextInput
          placeholder="Busque suas receitas"
          style={[styles.input, { borderColor: colors.darkBlue }]}
          placeholderTextColor={"rgb(34, 87, 122, 38%)"}
        />
        <Pressable
          onPress={() => {
            console.log("Clicou na lupa");
          }}
        >
          <FontAwesome name="search" size={20} color={colors.darkBlue} />
        </Pressable>
      </View>
    </View>
  );
}

export const themeContext = createContext({
  colors: {
    headerBackground: "#edf2f4",
    darkBlue: "#22577A",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
  },

  header: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },

  input: {
    width: 400,
    borderWidth: 2,
    borderRadius: 16,
    padding: 6,
  },
});
