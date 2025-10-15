import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";
import { Link } from "expo-router";
import Logo from "../../../components/Logo";

export default function Perfil() {
  const { colors } = useContext(themeContext);

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
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.container]}>
          <Logo />

          <View style={styles.header}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={80}
              color={colors.darkBlue}
            />
            <Text style={styles.userName}>Maria</Text>
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

            <Link href="/(tabs)/perfil/sairDaConta" asChild>
              <TouchableOpacity style={styles.card}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  size={35}
                  color={colors.darkBlue}
                />
                <Text style={styles.cardText}>Sair da Conta</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
