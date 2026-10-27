import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Product from "../../model/entities/Product";
import { formatBRL } from "../format";
import { colors } from "../theme";

type Props = { product: Product; onPress: () => void };

export function ProductListItem({ product, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatBRL(product.price)}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.thumb}>
        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.emoji}>{product.emoji}</Text>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatBRL(product.price)}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.85 },
  thumb: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: colors.purpleSoft,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emoji: { fontSize: 30 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  price: { fontSize: 14, color: colors.textSoft },
  chevron: { fontSize: 26, color: colors.textSoft },
});
