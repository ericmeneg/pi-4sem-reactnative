import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';

interface FeatureCardProps {
  title: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  route: string; // Rota para onde navegar
}

export default function FeatureCard({ title, iconName, route }: FeatureCardProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    router.push(route);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.cardBackground }]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons 
        name={iconName} 
        size={40} 
        color="#57CC99"
      />
      <Text style={[styles.title, { color: colors.darkBlue }]} variant="titleMedium"> 
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    card: {
    flex: 1,
    height: 140,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 20, 
    paddingHorizontal: 10,
  },
  shortcutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dailyTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});