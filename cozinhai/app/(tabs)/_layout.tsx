import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { View } from "react-native";

export default function Layout() {
  const { colors } = useContext(themeContext);

  const CircleIcon = ({ name, size, focused, color }: { name: string; size: number; focused: boolean; color: string }) => (
    <View
      style={{
        backgroundColor: focused ? colors.headerBackground : "transparent",
        borderRadius: 999,
        padding: 0,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: focused ? 20 : 0,
        elevation: focused ? 12 : 0,
      }}
    >
      <MaterialCommunityIcons
        name={name as any}
        size={size}
        color={color}
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.darkBlue,
        tabBarInactiveTintColor: colors.inactiveIcon,
        tabBarStyle: {
          backgroundColor: colors.darkBlue,
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 20,
          paddingBottom: 40,
          overflow: "visible",
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => <CircleIcon name="home" size={28} focused={focused} color={color} />,
        }}
      />

      <Tabs.Screen
        name="pesquisarReceitas"
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => <CircleIcon name="magnify" size={28} focused={focused} color={color} />,
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => <CircleIcon name="account" size={28} focused={focused} color={color} />,
        }}
      />
    </Tabs>
  );
}
