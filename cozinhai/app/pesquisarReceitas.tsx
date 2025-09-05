// app/pesquisaReceitas.tsx
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Image, TextInput } from "react-native";
import { Text, Checkbox, Button } from "react-native-paper";
import Header from "../components/Header";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function PesquisaReceitas() {
  const [filters, setFilters] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
  });

  const { colors } = useContext(themeContext);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.main}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.mainLogo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: colors.darkBlue }]}>
          Pesquisar Receitas
        </Text>

        <TextInput
          placeholder="Busque suas receitas"
          style={[styles.input, { borderColor: colors.darkBlue }]}
          placeholderTextColor={"rgb(34, 87, 122, 38%)"}
        />


        <Text style={[styles.subtitle, { color: colors.darkBlue }]}>
          Filtros Alimentares
        </Text>

        <View style={styles.filters}>
          <View style={styles.filterItem}>
            <Checkbox
              status={filters.vegan ? "checked" : "unchecked"}
              onPress={() => toggleFilter("vegan")}
              color={colors.darkBlue}
            />
            <Text>Vegano</Text>
          </View>

          <View style={styles.filterItem}>
            <Checkbox
              status={filters.vegetarian ? "checked" : "unchecked"}
              onPress={() => toggleFilter("vegetarian")}
              color={colors.darkBlue}
            />
            <Text>Vegetariano</Text>
          </View>

          <View style={styles.filterItem}>
            <Checkbox
              status={filters.glutenFree ? "checked" : "unchecked"}
              onPress={() => toggleFilter("glutenFree")}
              color={colors.darkBlue}
            />
            <Text>Sem Glúten</Text>
          </View>

          <View style={styles.filterItem}>
            <Checkbox
              status={filters.dairyFree ? "checked" : "unchecked"}
              onPress={() => toggleFilter("dairyFree")}
              color={colors.darkBlue}
            />
            <Text>Sem Lactose</Text>
          </View>
        </View>

        <Button
          mode="contained"
          buttonColor={colors.darkBlue}
          textColor="#fff"
          style={styles.button}
          onPress={() => console.log("Pesquisar clicado")}
        >
          Pesquisar
        </Button>

      </View>

      <View style={{ width: "100%" }}>
        <Footer />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 20,
  },
  mainLogo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
  filters: {
    width: "100%",
    gap: 10,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterLabel: {
    color: "#22577A",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    paddingHorizontal: 30,
  },
});

