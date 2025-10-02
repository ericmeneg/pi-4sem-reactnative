import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper'; 
import DailyRecipes from '../../components/DailyRecipes';
import FeatureCard from '../../components/FeatureCard';
import { themeContext } from '../../context/ThemeContext'; 
import Logo from '../../components/Logo';



export default function Home() {
  const { colors } = useContext(themeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.headerBackground }]}>
      
      {/* 1. Título de Boas-vindas (Limpo e no topo) */}
      <View style={styles.header}>
        <Logo />
        <Text variant="headlineMedium" style={[styles.mainTitle, { color: colors.darkBlue }]}>
          O que vamos cozinhar hoje?
        </Text>
        <Text style={[styles.subTitle, { color: colors.secondaryText }]}>
          Encontre inspiração e comece a preparar sua próxima refeição.
        </Text>
      </View>

      
      
      {/* 3. Cartões de Atalho Principais (2x2 Grid) */}
      <Text variant="titleLarge" style={[styles.shortcutsTitle, { color: colors.darkBlue }]}>
        Acessos Rápidos
      </Text>
      <View style={styles.shortcutsContainer}>
        <FeatureCard 
          title="Ingredientes da Época" 
          iconName="food-apple-outline" 
          route="/ingredientesEpoca" 
        />
        <FeatureCard 
          title="Livro de Receitas" 
          iconName="bookmark-multiple-outline" 
          route="/receitasSalvas" 
        />
        <FeatureCard 
          title="Pesquisar por Ingredientes" 
          iconName="fridge-outline" 
          route="/pesquisarPorIngredientes" 
        />
        <FeatureCard 
          title="Meu Perfil" 
          iconName="account-circle-outline" 
          route="/perfil" 
        />
      </View>

      {/* 4. Receitas Diárias */}
      <Text variant="titleLarge" style={[styles.dailyTitle, { color: colors.darkBlue }]}>
        Recomendações Diárias
      </Text>
      <DailyRecipes />
      
      {/* Espaço para o tab bar não sobrepor */}
      <View style={{ height: 120 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 25, // Maior espaçamento vertical no topo
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
  },
  quickSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12, // Forma sutilmente arredondada
    gap: 10,
    marginBottom: 30, // Espaço confortável após a busca
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickSearchText: {
    fontSize: 16,
  },
  shortcutsTitle: {
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  shortcutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 12, 
  },
  dailyTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  }
});