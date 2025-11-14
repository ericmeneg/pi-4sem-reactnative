import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";
import { Link, useRouter } from "expo-router";
import Logo from "../../../components/Logo";
import { useAuth } from "../../_layout";

export default function Perfil() {
  const { colors } = useContext(themeContext);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/login");
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#F9FAFB",
    },
    container: {
      flex: 1,
      gap: 40,
      paddingBottom: 100,
    },
    header: {
      alignItems: "center",
      paddingVertical: 20,
    },
    userName: {
      fontSize: 26,
      color: colors.darkBlue,
      fontWeight: "bold",
      marginTop: 10,
    },
    userEmail: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 4,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      marginHorizontal: 20,
      marginBottom: 15,
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
      gap: 15,
    },
    cardText: {
      color: colors.darkBlue,
      fontSize: 17,
      fontWeight: "600",
    },
    logoutCard: {
      backgroundColor: "#FFF5F5",
      borderWidth: 1,
      borderColor: "#FEE",
    },
    logoutText: {
      color: "#DC2626",
      fontSize: 17,
      fontWeight: "600",
    },
    guestBadge: {
      backgroundColor: "#FEF3C7",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginTop: 8,
    },
    guestText: {
      color: "#92400E",
      fontSize: 12,
      fontWeight: "600",
    },
  });

  // Se não estiver logado (modo visitante)
  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[globalStyles.container, styles.container]}>
            <Logo />

            <View style={[styles.header, {marginTop: -100}]}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={80}
                color={colors.secondaryText}
              />
              <Text style={styles.userName}>Visitante</Text>
              <View style={styles.guestBadge}>
                <Text style={styles.guestText}>Modo visitante</Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/login")}
              >
                <MaterialCommunityIcons
                  name="login"
                  size={35}
                  color={colors.darkBlue}
                />
                <Text style={styles.cardText}>Fazer Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/register")}
              >
                <MaterialCommunityIcons
                  name="account-plus"
                  size={35}
                  color={colors.darkBlue}
                />
                <Text style={styles.cardText}>Criar Conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Se estiver logado
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.container]}>
          <Logo />

          <View style={[styles.header, {marginTop: -100}]}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={80}
              color={colors.darkBlue}
            />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>

          <View>
            <Link href="/(tabs)/perfil/alterarSenha" asChild>
              <TouchableOpacity style={styles.card}>
                <MaterialCommunityIcons
                  name="key-variant"
                  size={35}
                  color={colors.darkBlue}
                />
                <Text style={styles.cardText}>Alterar Senha</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/(tabs)/perfil/verComentarios" asChild>
              <TouchableOpacity style={styles.card}>
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={35}
                  color={colors.darkBlue}
                />
                <Text style={styles.cardText}>Ver Seus Comentários</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/(tabs)/perfil/livroReceitas" asChild>
              <TouchableOpacity style={styles.card}>
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={35}
                  color={colors.darkBlue}
                />
                <Text style={styles.cardText}>Ver Receitas Salvas</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[styles.card, styles.logoutCard]}
              onPress={handleLogout}
            >
              <MaterialCommunityIcons
                name="exit-to-app"
                size={35}
                color="#DC2626"
              />
              <Text style={styles.logoutText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}