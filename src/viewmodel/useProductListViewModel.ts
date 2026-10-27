import { useCallback, useEffect, useState } from "react";
import Category from "../model/entities/Category";
import Product from "../model/entities/Product";
import { IMenuUseCases } from "../usecase/iMenuUseCases";
import { menuUseCases } from "../di/container";
import { toErrorMessage } from "./errorMessage";

export type ProductListState = {
  category: Category | null;
  products: Product[];
  loading: boolean;
  error: string | null;
};

export type ProductListActions = {
  reload: () => void;
};

export function useProductListViewModel(
  categoryId: string,
  menu: IMenuUseCases = menuUseCases
): ProductListState & ProductListActions {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([
      menu.getCategory(categoryId),
      menu.listProductsByCategory(categoryId),
    ])
      .then(([cat, list]) => {
        if (!active) return;
        setCategory(cat);
        setProducts(list);
      })
      .catch((err) => active && setError(toErrorMessage(err)))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [menu, categoryId, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { category, products, loading, error, reload };
}
