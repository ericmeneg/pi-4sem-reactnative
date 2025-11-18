import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { themeContext } from "../../../context/ThemeContext";
import { globalStyles } from "../../../styles/globalStyles";
import VoltarHeader from "../../../components/VoltarHeader";
import { useAuth } from "../../_layout";
import { useRouter } from "expo-router";

const API_URL = "https://pi-3sem-backend.onrender.com";

interface PasswordRequirement {
  text: string;
  regex: RegExp;
}

const passwordRequirements: PasswordRequirement[] = [
  { text: "Mínimo de 8 caracteres", regex: /.{8,}/ },
  { text: "Pelo menos uma letra maiúscula", regex: /[A-Z]/ },
  { text: "Pelo menos uma letra minúscula", regex: /[a-z]/ },
  { text: "Pelo menos um número", regex: /\d/ },
  { text: "Pelo menos um caractere especial (!@#$%^&*)", regex: /[!@#$%^&*]/ },
];

export default function AlterarSenha() {
  const { colors } = useContext(themeContext);
  const { user, token } = useAuth();
  const router = useRouter();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const checkRequirement = (requirement: PasswordRequirement): boolean => {
    return requirement.regex.test(novaSenha);
  };

  const allRequirementsMet = passwordRequirements.every((req) =>
    checkRequirement(req)
  );

  const handleAlterarSenha = async () => {
    // Validações
    if (!senhaAtual.trim()) {
      Alert.alert("Atenção", "Informe a senha atual.");
      return;
    }

    if (!novaSenha.trim()) {
      Alert.alert("Atenção", "Informe a nova senha.");
      return;
    }

    if (!allRequirementsMet) {
      Alert.alert("Atenção", "A nova senha não atende todos os requisitos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Atenção", "A nova senha e a confirmação não coincidem.");
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert("Atenção", "A nova senha deve ser diferente da senha atual.");
      return;
    }

    if (!user || !token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/user/${user.id}/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: senhaAtual,
          newPassword: novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Trata erros específicos
        if (response.status === 400 && data.message) {
          Alert.alert("Erro", data.message);
        } else if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join("\n");
          Alert.alert("Erro de validação", errorMessages);
        } else {
          Alert.alert("Erro", data.message || "Erro ao alterar senha");
        }
        return;
      }

      // Sucesso
      Alert.alert(
        "Sucesso!",
        "Senha alterada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              // Limpa os campos
              setSenhaAtual("");
              setNovaSenha("");
              setConfirmarSenha("");
              // Volta para a tela de perfil
              router.back();
            },
          },
        ]
      );
    } catch (err: any) {
      Alert.alert("Erro", err?.message || "Erro ao conectar com o servidor");
    } finally {
      setSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    scrollContent: {
      flexGrow: 1,
    },
    container: {
      ...globalStyles.container,
      alignItems: "center",
      width: "100%",
      paddingTop: 30,
      paddingHorizontal: 25,
      paddingBottom: 40,
    },
    title: {
      fontSize: 26,
      color: colors.darkBlue,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 20,
      marginTop: 20,
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
      color: "#555",
    },
    eyeButton: {
      position: "absolute",
      right: 10,
      top: 12,
    },
    button: {
      backgroundColor: colors.darkBlue,
      borderRadius: 20,
      paddingVertical: 14,
      paddingHorizontal: 60,
      marginTop: 20,
      width: "100%",
      alignItems: "center",
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    requirementsBox: {
      backgroundColor: "#F8FAFC",
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      width: "100%",
    },
    requirementsTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.darkBlue,
      marginBottom: 12,
    },
    requirementItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      gap: 8,
    },
    requirementText: {
      fontSize: 14,
      color: "#666",
    },
    requirementMet: {
      color: "#22AA22",
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
                editable={!submitting}
                mode="flat"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
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
                editable={!submitting}
                mode="flat"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
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

            {/* Requisitos da senha */}
            {novaSenha.length > 0 && (
              <View style={styles.requirementsBox}>
                <Text style={styles.requirementsTitle}>
                  Requisitos da nova senha:
                </Text>
                {passwordRequirements.map((req, index) => {
                  const isMet = checkRequirement(req);
                  return (
                    <View key={index} style={styles.requirementItem}>
                      <MaterialCommunityIcons
                        name={isMet ? "check" : "close"}
                        size={18}
                        color={isMet ? "#22AA22" : "#999"}
                      />
                      <Text
                        style={[
                          styles.requirementText,
                          isMet && styles.requirementMet,
                        ]}
                      >
                        {req.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirme a nova senha"
                placeholderTextColor="#999"
                secureTextEntry={!mostrarConfirmar}
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                editable={!submitting}
                mode="flat"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
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
              style={[styles.button, submitting && styles.buttonDisabled]}
              onPress={handleAlterarSenha}
              activeOpacity={0.8}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Alterar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}