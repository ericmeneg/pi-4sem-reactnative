import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import VoltarHeader from "../../../components/VoltarHeader";
import { useAuth } from "../../_layout";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SairDaConta() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      `${user?.name}, tem certeza que deseja sair?`,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <VoltarHeader />

        <View style={styles.main}>
          <MaterialCommunityIcons
            name="exit-to-app"
            size={80}
            color="#DC2626"
          />

          <Text style={styles.title}>Sair da Conta</Text>
          <Text style={styles.subtitle}>
            Você será desconectado e precisará fazer login novamente para acessar suas informações.
          </Text>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Confirmar Saída</Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingBottom: 40,
  },
  main: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 40,
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#22577A",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#22577A",
    fontSize: 18,
    fontWeight: "600",
  },
});