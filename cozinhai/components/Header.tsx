import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { themeContext } from "../context/ThemeContext";

export default function Header() {
  const { colors } = useContext(themeContext);
  return (
    <View style={styles.container} testID="container">
      <View
        style={[styles.header, { backgroundColor: colors.headerBackground }]}
        testID="header"
      >
        <View style={styles.inputContent} testID="headerContent">
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  header: {
    height: 120,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 25,
  },

  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 500,
  },

  input: {
    width: 250,
    borderWidth: 2,
    borderRadius: 16,
    padding: 6,
  },
});
