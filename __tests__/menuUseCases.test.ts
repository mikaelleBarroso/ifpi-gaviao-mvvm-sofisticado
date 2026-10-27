import Category from "../src/model/entities/Category";
import Product from "../src/model/entities/Product";
import { ICategoryDataSource } from "../src/model/datasources/iCategoryDataSource";
import { IProductDataSource } from "../src/model/datasources/iProductDataSource";
import { DataSourceError, NotFoundError, ValidationError } from "../src/model/errors";
import { MenuUseCases } from "../src/usecase/menuUseCases";

const comidas: Category = { id: "comidas", name: "Comidas", emoji: "🥟" };
const pastel: Product = {
  id: "pastel", categoryId: "comidas", name: "Pastel", description: "d",
  price: 6, emoji: "🥟", protein: 1, carbs: 1, fat: 1,
};

// Test doubles: nenhuma infraestrutura real é necessária.
const fakeCategories: ICategoryDataSource = {
  list: async () => [comidas],
  findById: async (id) => (id === "comidas" ? comidas : null),
};
const fakeProducts: IProductDataSource = {
  listByCategory: async (id) => (id === "comidas" ? [pastel] : []),
  findById: async (id) => (id === "pastel" ? pastel : null),
};

const makeUseCases = () => new MenuUseCases(fakeCategories, fakeProducts);

describe("MenuUseCases", () => {
  it("lista as categorias", async () => {
    await expect(makeUseCases().listCategories()).resolves.toEqual([comidas]);
  });

  it("lista os produtos de uma categoria existente", async () => {
    await expect(makeUseCases().listProductsByCategory("comidas")).resolves.toEqual([pastel]);
  });

  it("rejeita identificador vazio com ValidationError", async () => {
    await expect(makeUseCases().listProductsByCategory("  ")).rejects.toBeInstanceOf(ValidationError);
    await expect(makeUseCases().getProduct("")).rejects.toBeInstanceOf(ValidationError);
  });

  it("lança NotFoundError para categoria ou produto inexistente", async () => {
    await expect(makeUseCases().getCategory("x")).rejects.toBeInstanceOf(NotFoundError);
    await expect(makeUseCases().getProduct("x")).rejects.toBeInstanceOf(NotFoundError);
  });

  it("propaga DataSourceError vindo da infraestrutura", async () => {
    const broken: ICategoryDataSource = {
      list: async () => { throw new DataSourceError("falhou"); },
      findById: async () => null,
    };
    const useCases = new MenuUseCases(broken, fakeProducts);
    await expect(useCases.listCategories()).rejects.toBeInstanceOf(DataSourceError);
  });

  it("respeita os limites de quantidade (1 a 10)", () => {
    const useCases = makeUseCases();
    expect(useCases.changeQuantity(1, 1)).toBe(2);
    expect(() => useCases.changeQuantity(1, -1)).toThrow(ValidationError);
    expect(() => useCases.changeQuantity(10, 1)).toThrow(ValidationError);
  });
});
