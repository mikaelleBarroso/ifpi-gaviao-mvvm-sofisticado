import Category from "../model/entities/Category";
import Product from "../model/entities/Product";
import { ICategoryDataSource } from "../model/datasources/iCategoryDataSource";
import { IProductDataSource } from "../model/datasources/iProductDataSource";
import { NotFoundError, ValidationError } from "../model/errors";
import { IMenuUseCases } from "./iMenuUseCases";

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

// Depende apenas de interfaces (DIP): nenhuma implementação concreta é importada.
export class MenuUseCases implements IMenuUseCases {
  private categories: ICategoryDataSource;
  private products: IProductDataSource;

  constructor(categories: ICategoryDataSource, products: IProductDataSource) {
    this.categories = categories;
    this.products = products;
  }

  listCategories(): Promise<Category[]> {
    return this.categories.list();
  }

  async getCategory(categoryId: string): Promise<Category> {
    const id = requireId(categoryId, "categoria");
    const category = await this.categories.findById(id);
    if (!category) {
      throw new NotFoundError("Categoria não encontrada.");
    }
    return category;
  }

  async listProductsByCategory(categoryId: string): Promise<Product[]> {
    const category = await this.getCategory(categoryId);
    return this.products.listByCategory(category.id);
  }

  async getProduct(productId: string): Promise<Product> {
    const id = requireId(productId, "produto");
    const product = await this.products.findById(id);
    if (!product) {
      throw new NotFoundError("Produto não encontrado.");
    }
    return product;
  }

  changeQuantity(current: number, delta: number): number {
    const next = current + delta;
    if (next < MIN_QUANTITY) {
      throw new ValidationError(`A quantidade mínima é ${MIN_QUANTITY}.`);
    }
    if (next > MAX_QUANTITY) {
      throw new ValidationError(
        `A quantidade máxima por pedido é ${MAX_QUANTITY}.`
      );
    }
    return next;
  }
}

function requireId(value: string | undefined, label: string): string {
  const id = (value ?? "").trim();
  if (!id) {
    throw new ValidationError(`O identificador da ${label} é obrigatório.`);
  }
  return id;
}
