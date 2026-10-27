import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type Props = { value: number; onIncrease: () => void; onDecrease: () => void };

export function QuantityStepper({ value, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onDecrease}
        accessibilityRole="button"
        accessibilityLabel="Diminuir quantidade"
        style={[styles.button, { backgroundColor: colors.purple }]}
      >
        <Text style={styles.buttonText}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        onPress={onIncrease}
        accessibilityRole="button"
        accessibilityLabel="Aumentar quantidade"
        style={[styles.button, { backgroundColor: colors.green }]}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  button: { width: 34, height: 34, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "700", lineHeight: 22 },
  value: { fontSize: 18, fontWeight: "700", color: colors.text, minWidth: 22, textAlign: "center" },
});
