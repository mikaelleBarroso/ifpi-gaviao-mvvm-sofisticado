import Product from "../../model/entities/Product";
import { IProductDataSource } from "../../model/datasources/iProductDataSource";
import { withLatency } from "./latency";

const PRODUCTS: Product[] = [
  {
    id: "pastel-de-carne",
    categoryId: "comidas",
    name: "Pastel de Carne",
    description: "Pastel frito na hora, recheado com carne moída bem temperada.",
    price: 6,
    emoji: "🥟",
    imageUrl: "https://t3.ftcdn.net/jpg/16/94/74/48/240_F_1694744817_efOoxFSYyxFAI3BthwuJtzdXG1xi4DoC.jpg",
    protein: 12,
    carbs: 30,
    fat: 14,
  },
  {
    id: "coxinha-de-frango",
    categoryId: "comidas",
    name: "Coxinha de Frango",
    description: "Massa macia com recheio cremoso de frango desfiado.",
    price: 7,
    emoji: "🍗",
    imageUrl: "https://t3.ftcdn.net/jpg/11/07/68/32/240_F_1107683236_avaxOV76LG9Kv8TYKQAd5XAsgspGxWA7.jpg",
    protein: 10,
    carbs: 28,
    fat: 11,
  },
  {
    id: "cuscuz-com-ovo",
    categoryId: "comidas",
    name: "Cuscuz com Ovo",
    description: "Cuscuz de milho no vapor acompanhado de ovo frito.",
    price: 8,
    emoji: "🍳",
    imageUrl: "https://totalpass.com/wp-content/uploads/2025/01/cuscuz-de-milho.jpg",
    protein: 14,
    carbs: 36,
    fat: 9,
  },
  {
    id: "arrumadinho-completo",
    categoryId: "comidas",
    name: "Arrumadinho Completo",
    description:
      "Carne de sol desfiada, arroz branco soltinho e creme de galinha caseiro.",
    price: 14,
    emoji: "🍛",
    imageUrl:
      "https://media.istockphoto.com/id/1304979989/pt/foto/traditional-brazilian-food-dish-tasty-homemade-lunch-top-view.jpg?s=612x612&w=is&k=20&c=fbfFIIsDasYpNleBnSHvM9cC2vqRwkOKmt-6-vu3oi0=",
    protein: 22,
    carbs: 45,
    fat: 12,
  },
  {
    id: "suco-de-laranja",
    categoryId: "bebidas",
    name: "Suco de Laranja",
    description: "Suco natural de laranja, feito na hora e sem açúcar adicionado.",
    price: 5,
    emoji: "🍊",
    protein: 1,
    carbs: 21,
    fat: 0,
  },
  {
    id: "cafe",
    categoryId: "bebidas",
    name: "Café",
    description: "Café coado fresquinho, ideal para o intervalo.",
    price: 3,
    emoji: "☕",
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  {
    id: "refrigerante-lata",
    categoryId: "bebidas",
    name: "Refrigerante Lata",
    description: "Lata de 350 ml, servida gelada.",
    price: 6,
    emoji: "🥤",
    protein: 0,
    carbs: 37,
    fat: 0,
  },
  {
    id: "agua-de-coco",
    categoryId: "bebidas",
    name: "Água de Coco",
    description: "Água de coco natural, leve e refrescante.",
    price: 5,
    emoji: "🥥",
    protein: 1,
    carbs: 9,
    fat: 0,
  },
];

export class MemoryProductDataSource implements IProductDataSource {
  private delayMs: number;

  constructor(delayMs: number = 700) {
    this.delayMs = delayMs;
  }

  listByCategory(categoryId: string): Promise<Product[]> {
    return withLatency(
      this.delayMs,
      () => PRODUCTS.filter((p) => p.categoryId === categoryId),
      "Não foi possível carregar o cardápio."
    );
  }

  findById(id: string): Promise<Product | null> {
    return withLatency(
      this.delayMs,
      () => PRODUCTS.find((p) => p.id === id) ?? null,
      "Não foi possível carregar o produto."
    );
  }
}
