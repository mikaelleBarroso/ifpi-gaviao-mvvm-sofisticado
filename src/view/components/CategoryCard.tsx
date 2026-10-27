import { Pressable, StyleSheet, Text, View } from "react-native";
import Category from "../../model/entities/Category";
import { colors } from "../theme";

type Props = {
  category: Category;
  accent: string;
  tint: string;
  onPress: () => void;
};

export function CategoryCard({ category, accent, tint, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver ${category.name}`}
      style={({ pressed }) => [styles.card, { borderColor: accent }, pressed && styles.pressed]}
    >
      <View style={[styles.art, { backgroundColor: tint }]}>
        <Text style={styles.emoji}>{category.emoji}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={[styles.arrow, { color: accent }]}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderRadius: 18,
    padding: 8,
    gap: 10,
  },
  pressed: { opacity: 0.85 },
  art: { height: 130, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 60 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingBottom: 4,
  },
  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  arrow: { fontSize: 24, fontWeight: "700" },
});
