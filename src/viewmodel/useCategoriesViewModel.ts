import { useCallback, useEffect, useState } from "react";
import Category from "../model/entities/Category";
import { IMenuUseCases } from "../usecase/iMenuUseCases";
import { menuUseCases } from "../di/container";
import { toErrorMessage } from "./errorMessage";

export type CategoriesState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};

export type CategoriesActions = {
  reload: () => void;
};

// Recebe o Use Case por parâmetro (default vem do container) => fácil de testar.
export function useCategoriesViewModel(
  menu: IMenuUseCases = menuUseCases
): CategoriesState & CategoriesActions {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    menu
      .listCategories()
      .then((result) => active && setCategories(result))
      .catch((err) => active && setError(toErrorMessage(err)))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [menu, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { categories, loading, error, reload };
}
