import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { Divider } from "react-native-paper";
import { globalStyles } from "../../styles/globalStyles";

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
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      justifyContent: "flex-start",
      padding: 10,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.container}>
          <Image
            source={require("../../assets/logo.png")}
            style={globalStyles.logo}
            resizeMode="contain"
            testID="logo"
          />

          <View testID="userSection" style={styles.userSection}>
            <View testID="accountTitleContent" style={styles.accountTitle}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={30}
                color={colors.darkBlue}
              />

              <Text style={{ color: colors.darkBlue }}>Maria</Text>
            </View>

            <View testID="userOptions">
              <View testID="alterarSenha" style={styles.userOption}>
                <MaterialCommunityIcons
                  name="key-variant"
                  color={colors.darkBlue}
                  size={25}
                />
                <Text style={{ color: colors.darkBlue, fontWeight: "bold" }}>
                  Alterar Senha
                </Text>
              </View>

              <Divider
                style={{
                  borderColor: colors.darkBlue,
                  height: 1,
                  opacity: 0.4,
                }}
              />

              <View testID="verComentarios" style={styles.userOption}>
                <MaterialCommunityIcons
                  name="comment-text"
                  color={colors.darkBlue}
                  size={25}
                />
                <Text style={{ color: colors.darkBlue, fontWeight: "bold" }}>
                  Ver Seus Comentários
                </Text>
              </View>

              <Divider
                style={{
                  borderColor: colors.darkBlue,
                  height: 1,
                  opacity: 0.4,
                }}
              />

              <View testID="receitasSalvas" style={styles.userOption}>
                <MaterialCommunityIcons
                  name="book"
                  color={colors.darkBlue}
                  size={25}
                />
                <Text style={{ color: colors.darkBlue, fontWeight: "bold" }}>
                  Ver Receitas Salvas
                </Text>
              </View>

              <Divider
                style={{
                  borderColor: colors.darkBlue,
                  height: 1,
                  opacity: 0.4,
                }}
              />

              <View testID="sair" style={styles.userOption}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  color={colors.darkBlue}
                  size={25}
                />
                <Text style={{ color: colors.darkBlue, fontWeight: "bold" }}>
                  Sair
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
