import { Stack } from "expo-router";

export default function perfilLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Screen name="alterarSenha" options={{ title: "Alterar senha" }} />

      <Stack.Screen
        name="verComentários"
        options={{ title: "Ver comentários" }}
      />

      <Stack.Screen
        name="livroReceitas"
        options={{ title: "Ver receitas salvas" }}
      />

      <Stack.Screen name="sairDaConta" options={{ title: "Sair" }} />
    </Stack>
  );
}
