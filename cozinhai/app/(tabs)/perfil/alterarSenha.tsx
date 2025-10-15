import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";
import VoltarHeader from "../../../components/VoltarHeader";

export default function AlterarSenha() {
  const { colors } = useContext(themeContext);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    container: {
      ...globalStyles.container,
      alignItems: "center",
      width: "100%",
      paddingTop: 30,
      paddingHorizontal: 25,
    },
    logo: {
      width: 210,
      height: 50,
      resizeMode: "contain",
      marginBottom: 40,
    },
    title: {
      fontSize: 26,
      color: colors.darkBlue,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 40,
    },
    inputContainer: {
      width: "100%",
      position: "relative",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: "#fff",
      borderColor: colors.darkBlue,
      borderWidth: 1.2,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingRight: 45,
      fontSize: 16,
      color: "#555", // texto dentro da caixa
    },
    eyeButton: {
      position: "absolute",
      right: 10,
      top: 12,
    },
    button: {
      backgroundColor: colors.darkBlue,
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 60,
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  const handleAlterarSenha = () => {
    console.log("Senha atual:", senhaAtual);
    console.log("Nova senha:", novaSenha);
    console.log("Confirmação:", confirmarSenha);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.container}>
          <VoltarHeader />

          <Text style={styles.title}>Alterar senha</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Senha atual"
              placeholderTextColor="#999"
              secureTextEntry={!mostrarSenhaAtual}
              style={styles.input}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
            >
              <MaterialCommunityIcons
                name={mostrarSenhaAtual ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nova senha"
              placeholderTextColor="#999"
              secureTextEntry={!mostrarNovaSenha}
              style={styles.input}
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}
            >
              <MaterialCommunityIcons
                name={mostrarNovaSenha ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirme a nova senha"
              placeholderTextColor="#999"
              secureTextEntry={!mostrarConfirmar}
              style={styles.input}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarConfirmar(!mostrarConfirmar)}
            >
              <MaterialCommunityIcons
                name={mostrarConfirmar ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAlterarSenha}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
