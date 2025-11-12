import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const API_URL = 'https://pi-3sem-backend.onrender.com';

interface PasswordRequirement {
  text: string;
  regex: RegExp;
}

const passwordRequirements: PasswordRequirement[] = [
  { text: 'Mínimo de 8 caracteres', regex: /.{8,}/ },
  { text: 'Pelo menos uma letra maiúscula', regex: /[A-Z]/ },
  { text: 'Pelo menos uma letra minúscula', regex: /[a-z]/ },
  { text: 'Pelo menos um número', regex: /\d/ },
  { text: 'Pelo menos um caractere especial (!@#$%^&*)', regex: /[!@#$%^&*]/ },
];

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const logo = (() => {
    try {
      return require('../assets/logo.png');
    } catch {
      return null;
    }
  })();

  const checkRequirement = (requirement: PasswordRequirement): boolean => {
    return requirement.regex.test(password);
  };

  const allRequirementsMet = passwordRequirements.every((req) =>
    checkRequirement(req)
  );

  const handleRegister = async () => {
    // Validações
    if (!name.trim()) {
      Alert.alert('Atenção', 'Informe seu nome.');
      return;
    }

    if (name.trim().length < 3 || name.trim().length > 30) {
      Alert.alert('Atenção', 'O nome deve ter entre 3 e 30 caracteres.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Atenção', 'Informe seu e-mail.');
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Atenção', 'Informe um e-mail válido.');
      return;
    }

    if (!password) {
      Alert.alert('Atenção', 'Informe sua senha.');
      return;
    }

    if (!allRequirementsMet) {
      Alert.alert('Atenção', 'A senha não atende todos os requisitos.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Trata erros de validação
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join('\n');
          Alert.alert('Erro de validação', errorMessages);
        } else {
          Alert.alert('Erro', data.message || 'Erro ao criar conta');
        }
        return;
      }

      Alert.alert(
        'Sucesso!',
        'Conta criada com sucesso! Faça login para continuar.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (err: any) {
      Alert.alert('Erro', err?.message || 'Erro ao criar conta');
    } finally {
      setSubmitting(false);
    }
  };

  const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.inner} onPress={dismissKeyboard} accessible={false}>
          {logo && <Image source={logo} style={styles.logo} resizeMode="contain" />}

          <Text style={styles.title}>Junte-se ao CozinhAI</Text>
          <Text style={styles.subtitle}>
            Comece a reduzir o desperdício de alimentos hoje
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
              editable={!submitting}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!submitting}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={!submitting}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#666"
                />
              </Pressable>
            </View>

            {/* Requisitos da senha */}
            <View style={styles.requirementsBox}>
              <Text style={styles.requirementsTitle}>Requisitos da senha:</Text>
              {passwordRequirements.map((req, index) => {
                const isMet = checkRequirement(req);
                return (
                  <View key={index} style={styles.requirementItem}>
                    <MaterialCommunityIcons
                      name={isMet ? 'check' : 'close'}
                      size={18}
                      color={isMet ? '#22AA22' : '#999'}
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

            <Pressable
              style={[styles.button, submitting && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Criar conta</Text>
              )}
            </Pressable>

            <View style={styles.footer}>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.linkText}>
                  Já tem uma conta? <Text style={styles.linkBold}>Faça login</Text>
                </Text>
              </Pressable>

              <Pressable onPress={() => router.replace('/(tabs)')}>
                <Text style={styles.linkSecondary}>Continuar sem fazer login →</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContent: { flexGrow: 1 },
  inner: { flex: 1, padding: 24, alignItems: 'center', paddingBottom: 40 },
  logo: { width: 120, height: 120, marginTop: 20, marginBottom: 16 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22577A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: { width: '100%', maxWidth: 400 },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22577A',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#D1D5DB',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#D1D5DB',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  requirementsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22577A',
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
  },
  requirementMet: {
    color: '#22AA22',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#22577A',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#22577A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    gap: 16,
  },
  linkText: {
    color: '#666',
    fontSize: 15,
  },
  linkBold: {
    color: '#22577A',
    fontWeight: '600',
  },
  linkSecondary: {
    color: '#22577A',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});