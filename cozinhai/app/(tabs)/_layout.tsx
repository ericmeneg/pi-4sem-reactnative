import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";

export default function Layout() {
  const { colors } = useContext(themeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.cardBackground,
        tabBarInactiveTintColor: colors.inactiveIcon,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          backgroundColor: colors.darkBlue,
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          /*borderColor: colors.darkBlue, */
          paddingTop: 15,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pesquisarReceitas"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ingredientesEpoca"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
