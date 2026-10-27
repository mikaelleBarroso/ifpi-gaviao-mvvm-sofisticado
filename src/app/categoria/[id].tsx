import { router, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { useProductListViewModel } from "../../viewmodel/useProductListViewModel";
import { ProductListItem } from "../../view/components/ProductListItem";
import { EmptyView, ErrorView, LoadingView } from "../../view/components/StateViews";

export default function ProductListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vm = useProductListViewModel(id);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: vm.category?.name ?? "Cardápio" }} />

      {vm.loading ? (
        <LoadingView label="Carregando cardápio..." />
      ) : vm.error ? (
        <ErrorView message={vm.error} onRetry={vm.reload} />
      ) : (
        <FlatList
          data={vm.products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<EmptyView message="Nenhum item nesta categoria ainda." />}
          renderItem={({ item }) => (
            <ProductListItem product={item} onPress={() => router.push(`/produto/${item.id}`)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, flexGrow: 1 },
  separator: { height: 10 },
});
