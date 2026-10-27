import Category from "../entities/Category";

// Contrato que o domínio espera de qualquer fonte de categorias.
export interface ICategoryDataSource {
  list(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
}
