import { useCallback, useEffect, useState } from "react";
import Product from "../model/entities/Product";
import { IMenuUseCases } from "../usecase/iMenuUseCases";
import { menuUseCases } from "../di/container";
import { toErrorMessage } from "./errorMessage";

export type ProductDetailState = {
  product: Product | null;
  quantity: number;
  loading: boolean;
  error: string | null;
  quantityError: string | null;
};

export type ProductDetailActions = {
  increase: () => void;
  decrease: () => void;
  reload: () => void;
};

export function useProductDetailViewModel(
  productId: string,
  menu: IMenuUseCases = menuUseCases
): ProductDetailState & ProductDetailActions {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    menu
      .getProduct(productId)
      .then((result) => active && setProduct(result))
      .catch((err) => active && setError(toErrorMessage(err)))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [menu, productId, attempt]);

  // As regras de limite ficam no Use Case; a ViewModel só traduz o resultado.
  const change = useCallback(
    (delta: number) => {
      try {
        setQuantity(menu.changeQuantity(quantity, delta));
        setQuantityError(null);
      } catch (err) {
        setQuantityError(toErrorMessage(err));
      }
    },
    [menu, quantity]
  );

  const increase = useCallback(() => change(1), [change]);
  const decrease = useCallback(() => change(-1), [change]);
  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { product, quantity, loading, error, quantityError, increase, decrease, reload };
}
