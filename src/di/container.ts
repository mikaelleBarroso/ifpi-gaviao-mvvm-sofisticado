import { ICategoryDataSource } from "../model/datasources/iCategoryDataSource";
import { IProductDataSource } from "../model/datasources/iProductDataSource";
import { MemoryCategoryDataSource } from "../infra/datasources/MemoryCategoryDataSource";
import { MemoryProductDataSource } from "../infra/datasources/MemoryProductDataSource";
import { IMenuUseCases } from "../usecase/iMenuUseCases";
import { MenuUseCases } from "../usecase/menuUseCases";

// Composition Root: único lugar que conhece as implementações concretas.
// Para trocar a fonte de dados (Supabase, Firebase, API REST), só este arquivo muda.
const categoryDataSource: ICategoryDataSource = new MemoryCategoryDataSource();
const productDataSource: IProductDataSource = new MemoryProductDataSource();

export const menuUseCases: IMenuUseCases = new MenuUseCases(
  categoryDataSource,
  productDataSource
);
