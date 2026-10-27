import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCategoriesViewModel } from "../viewmodel/useCategoriesViewModel";
import { CategoryCard } from "../view/components/CategoryCard";
import { EmptyView, ErrorView, LoadingView } from "../view/components/StateViews";
import { colors } from "../view/theme";

const ACCENTS = [
  { accent: colors.purple, tint: colors.purpleSoft },
  { accent: colors.green, tint: colors.greenSoft },
];

export default function HomeScreen() {
  const vm = useCategoriesViewModel();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>🦅 IFPI Gavião</Text>
        <Text style={styles.subtitle}>O que você deseja pedir hoje?</Text>
        <Text style={styles.subtitle}>Escolha uma categoria:</Text>
      </View>

      {vm.loading ? (
        <LoadingView label="Carregando categorias..." />
      ) : vm.error ? (
        <ErrorView message={vm.error} onRetry={vm.reload} />
      ) : vm.categories.length === 0 ? (
        <EmptyView message="Nenhuma categoria disponível no momento." />
      ) : (
        <View style={styles.grid}>
          {vm.categories.map((category, index) => {
            const { accent, tint } = ACCENTS[index % ACCENTS.length];
            return (
              <CategoryCard
                key={category.id}
                category={category}
                accent={accent}
                tint={tint}
                onPress={() => router.push(`/categoria/${category.id}`)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.purple,
    paddingHorizontal: 20,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    gap: 2,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "800", marginBottom: 6 },
  subtitle: { color: "#E6D8F5", fontSize: 14 },
  grid: { flexDirection: "row", gap: 14, padding: 16 },
});
