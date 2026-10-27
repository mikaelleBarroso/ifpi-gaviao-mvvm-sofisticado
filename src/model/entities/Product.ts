// Entidade pura do domínio.
export default interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  imageUrl?: string;
  protein: number; // gramas
  carbs: number; // gramas
  fat: number; // gramas
}
