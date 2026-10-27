import Category from "../model/entities/Category";
import Product from "../model/entities/Product";

// Contrato conhecido pelas ViewModels. Elas nunca veem a implementação.
export interface IMenuUseCases {
  listCategories(): Promise<Category[]>;
  getCategory(categoryId: string): Promise<Category>;
  listProductsByCategory(categoryId: string): Promise<Product[]>;
  getProduct(productId: string): Promise<Product>;
  /** Soma `delta` à quantidade atual respeitando os limites do pedido. */
  changeQuantity(current: number, delta: number): number;
}
