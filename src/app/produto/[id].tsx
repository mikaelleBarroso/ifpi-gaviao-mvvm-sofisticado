import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useProductDetailViewModel } from "../../viewmodel/useProductDetailViewModel";
import { QuantityStepper } from "../../view/components/QuantityStepper";
import { ErrorView, LoadingView } from "../../view/components/StateViews";
import { formatBRL } from "../../view/format";
import { colors } from "../../view/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vm = useProductDetailViewModel(id);

  if (vm.loading) return <LoadingView label="Carregando detalhes..." />;
  if (vm.error || !vm.product) {
    return <ErrorView message={vm.error ?? "Produto indisponível."} onRetry={vm.reload} />;
  }

  const { product } = vm;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.hero}>
          {product.imageUrl ? (
            <Image source={{ uri: product.imageUrl }} style={styles.heroImage} resizeMode="cover" />
          ) : (
            <Text style={styles.heroEmoji}>{product.emoji}</Text>
          )}
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{formatBRL(product.price)}</Text>
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />

        <View style={styles.macros}>
          <Text style={styles.macro}>Proteínas: <Text style={styles.macroValue}>{product.protein}g</Text></Text>
          <Text style={styles.macro}>Carboidratos: <Text style={styles.macroValue}>{product.carbs}g</Text></Text>
          <Text style={styles.macro}>Gorduras: <Text style={styles.macroValue}>{product.fat}g</Text></Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantidade:</Text>
          <QuantityStepper value={vm.quantity} onIncrease={vm.increase} onDecrease={vm.decrease} />
        </View>
        {vm.quantityError && <Text style={styles.quantityError}>{vm.quantityError}</Text>}

        <Pressable style={styles.backButton} onPress={() => router.back()} accessibilityRole="button">
          <Text style={styles.backText}>Voltar ao Cardápio</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hero: {
    height: 190,
    borderRadius: 14,
    backgroundColor: colors.purpleSoft,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroEmoji: { fontSize: 96 },
  titleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  name: { flex: 1, fontSize: 22, fontWeight: "800", color: colors.text },
  priceBadge: { backgroundColor: colors.green, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10 },
  priceText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  description: { fontSize: 15, lineHeight: 21, color: colors.textSoft },
  divider: { height: 1, backgroundColor: colors.border },
  macros: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: 6 },
  macro: { fontSize: 12, color: colors.textSoft },
  macroValue: { fontWeight: "700", color: colors.text },
  quantityRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  quantityLabel: { fontSize: 15, fontWeight: "600", color: colors.text },
  quantityError: { color: colors.danger, fontSize: 13 },
  backButton: { backgroundColor: colors.purple, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 4 },
  backText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
