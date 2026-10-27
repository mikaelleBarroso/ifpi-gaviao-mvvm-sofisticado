import { DomainError } from "../model/errors";

// A View nunca faz try/catch: a ViewModel converte o erro em texto legível.
export function toErrorMessage(err: unknown): string {
  if (err instanceof DomainError) {
    return err.message;
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}
