// Formatação de apresentação (não é regra de negócio).
export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
