import Category from "../../model/entities/Category";
import { ICategoryDataSource } from "../../model/datasources/iCategoryDataSource";
import { withLatency } from "./latency";

const CATEGORIES: Category[] = [
  { id: "comidas", name: "Comidas", emoji: "🥟" },
  { id: "bebidas", name: "Bebidas", emoji: "🥤" },
];

export class MemoryCategoryDataSource implements ICategoryDataSource {
  private delayMs: number;

  constructor(delayMs: number = 700) {
    this.delayMs = delayMs;
  }

  list(): Promise<Category[]> {
    return withLatency(
      this.delayMs,
      () => [...CATEGORIES],
      "Não foi possível carregar as categorias."
    );
  }

  findById(id: string): Promise<Category | null> {
    return withLatency(
      this.delayMs,
      () => CATEGORIES.find((c) => c.id === id) ?? null,
      "Não foi possível carregar a categoria."
    );
  }
}
