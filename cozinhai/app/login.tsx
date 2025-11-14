import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Button, TextInput } from "react-native-paper"
import { useRouter } from 'expo-router';
import { useAuth } from './_layout';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Atenção', 'Informe e-mail e senha.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Erro', err?.message || 'Falha ao efetuar login');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVisitor = () => router.replace('/');

  const logo = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('../assets/logo.png');
    } catch {
      return null;
    }
  })();

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
      <Pressable
        style={styles.inner}
        onPress={dismissKeyboard}
        accessible={false}
      >
        {logo && <Image source={logo} style={styles.logo} resizeMode="contain" />}

        <Text style={styles.title}>{"Bem Vindo(a)"}!</Text>
        <Text style={styles.subtitle}>Entre com seu login:</Text>

        <TextInput
          mode="outlined"
          style={styles.input}
          activeOutlineColor='#22577A'
          label="Insira seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!submitting && !isLoading}
          autoFocus={Platform.OS !== 'web'}
          importantForAutofill="yes"
        />

        <TextInput
          mode="outlined"
          secureTextEntry={secure}
          style={styles.input}
          activeOutlineColor='#22577A'
          label="Insira sua senha"
          value={password}
          onChangeText={setPassword}
          editable={!submitting && !isLoading}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          right={<TextInput.Icon icon={secure ? "eye-off" : "eye"}
            onPress={() => setSecure(!secure)} />}
        />


        <Button
          mode="contained"
          style={[ {marginTop: 14, width: "100%", backgroundColor: "#22577A"}, (submitting || isLoading) && styles.buttonDisabled]}
          disabled={submitting || isLoading}
          onPress={handleLogin}
        >
          {(submitting || isLoading) ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </Button>

        <Button style={{width: "100%", marginTop: 8}} mode="outlined" onPress={() => router.push('/register')}>
          <Text style={styles.link}>Ainda não tem uma conta? Cadastre-se</Text>
        </Button>

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Ou</Text>
          <View style={styles.line} />
        </View>

        <Button mode="outlined" style={{width: "100%"}} onPress={handleVisitor}>
          <Text style={styles.visitorLink}>Entrar como visitante</Text>
        </Button>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, padding: 28, alignItems: 'center' },
  logo: { width: 110, height: 110, marginTop: 28, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#124a63' },
  subtitle: { marginTop: 8, marginBottom: 16, color: '#34495e' },
  input: {
    width: '100%',
    height: 46,
    marginTop: 8,
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#2b5f78',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#2b5f78', marginTop: 12 },
  orRow: { width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 12, color: '#6b7d87' },
  visitorLink: { color: '#2b5f78', width: "100%"},
});