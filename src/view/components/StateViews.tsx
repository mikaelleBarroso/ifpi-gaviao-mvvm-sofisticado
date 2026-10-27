import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function LoadingView({ label = "Carregando..." }: { label?: string }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.purple} />
      <Text style={styles.message}>{label}</Text>
    </View>
  );
}

export function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorTitle}>Algo deu errado</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.retry} onPress={onRetry} accessibilityRole="button">
        <Text style={styles.retryText}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ message }: { message: string }) {
  return (
    <View style={styles.center}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  message: { color: colors.textSoft, fontSize: 15, textAlign: "center" },
  errorTitle: { color: colors.danger, fontSize: 18, fontWeight: "700" },
  retry: {
    marginTop: 8,
    backgroundColor: colors.purple,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  retryText: { color: "#fff", fontWeight: "700" },
});
