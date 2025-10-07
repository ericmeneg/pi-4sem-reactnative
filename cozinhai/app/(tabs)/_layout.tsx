import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";

export default function Layout() {
  const { colors } = useContext(themeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.darkBlue,
        tabBarActiveBackgroundColor: colors.headerBackground,
        tabBarInactiveTintColor: colors.inactiveIcon,

        tabBarStyle: {
          backgroundColor: colors.darkBlue,
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 20,
          paddingBottom: 40,
        },

        tabBarItemStyle: {
          marginHorizontal: 8,
          justifyContent: "center",
          alignItems: "center",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              size={28}
              color={color}
              testID="homeIcon"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pesquisarReceitas"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              color={color}
              testID="pesquisaIcon"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={color}
              testID="perfilIcon"
            />
          ),
        }}
      />
    </Tabs>
  );
}
