import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../view/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.purple },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="categoria/[id]" options={{ title: "Cardápio", headerBackTitle: "Início" }} />
        <Stack.Screen name="produto/[id]" options={{ title: "Detalhes do Lanche", headerBackTitle: "Voltar" }} />
      </Stack>
    </>
  );
}
