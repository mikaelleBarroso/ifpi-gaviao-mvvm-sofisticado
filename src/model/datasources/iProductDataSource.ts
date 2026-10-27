import Product from "../entities/Product";

// Contrato que o domínio espera de qualquer fonte de produtos.
export interface IProductDataSource {
  listByCategory(categoryId: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
