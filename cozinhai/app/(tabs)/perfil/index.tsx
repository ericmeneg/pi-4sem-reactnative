import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { Divider } from "react-native-paper";
import { globalStyles } from "../../../styles/globalStyles";
import { Link } from "expo-router";

export default function Perfil() {
  const { colors } = useContext(themeContext);
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },

    userSection: {
      gap: 30,
      paddingBottom: 150,
    },

    accountTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      justifyContent: "center",
    },

    userOption: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      justifyContent: "center",
      padding: 10,
    },

    userOptionText: {
      color: colors.darkBlue,
      fontWeight: "bold",
      fontSize: 20,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.container}>
          <Image
            source={require("../../../assets/logo.png")}
            style={globalStyles.logo}
            resizeMode="contain"
            testID="logo"
          />

          <View testID="userSection" style={styles.userSection}>
            <View testID="accountTitleContent" style={styles.accountTitle}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={40}
                color={colors.darkBlue}
              />

              <Text
                style={{
                  color: colors.darkBlue,
                  fontSize: 25,
                  textDecorationLine: "underline",
                  fontWeight: "500",
                }}
              >
                Maria
              </Text>
            </View>

            <View testID="userOptions">
              <Link
                href="/(tabs)/perfil/alterarSenha"
                testID="alterarSenha"
                asChild
              >
                <Pressable style={styles.userOption}>
                  <MaterialCommunityIcons
                    name="key-variant"
                    color={colors.darkBlue}
                    size={35}
                  />
                  <Text style={styles.userOptionText}>Alterar Senha</Text>
                </Pressable>
              </Link>

              <Divider
                style={{
                  borderColor: colors.darkBlue,
                  height: 1,
                  opacity: 0.4,
                }}
              />

              <Link
                href="/(tabs)/perfil/verComentarios"
                testID="verComentarios"
                asChild
              >
                <Pressable style={styles.userOption}>
                  <MaterialCommunityIcons
                    name="comment-text"
                    color={colors.darkBlue}
                    size={35}
                  />
                  <Text style={styles.userOptionText}>
                    Ver Seus Comentários
                  </Text>
                </Pressable>
              </Link>

              <Divider
                style={{
                  borderColor: colors.darkBlue,
                  height: 1,
                  opacity: 0.4,
                }}
              />

              <Link
                href="/(tabs)/perfil/livroReceitas"
                testID="receitasSalvas"
                asChild
              >
                <Pressable style={styles.userOption}>
                  <MaterialCommunityIcons
                    name="book"
                    color={colors.darkBlue}
                    size={35}
                  />
                  <Text style={styles.userOptionText}>Ver Receitas Salvas</Text>
                </Pressable>
              </Link>

              <Divider
                style={{
                  borderColor: colors.darkBlue,
                  height: 1,
                  opacity: 0.4,
                }}
              />

              <Link href="/(tabs)/perfil/sairDaConta" testID="sair" asChild>
                <Pressable style={styles.userOption}>
                  <MaterialCommunityIcons
                    name="exit-to-app"
                    color={colors.darkBlue}
                    size={35}
                  />
                  <Text style={styles.userOptionText}>Sair</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
