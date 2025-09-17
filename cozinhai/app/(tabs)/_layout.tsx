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
          position: "absolute",
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          /*borderColor: colors.darkBlue, */
          borderBottomWidth: 0,
          borderWidth: 5,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pesquisarReceitas"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "DashBoard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ingredientesEpoca"
        options={{
          title: "Ingredientes época",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="playground"
        options={{
          title: "Playground",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="play-circle"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
