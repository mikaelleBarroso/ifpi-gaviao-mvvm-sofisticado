import { DataSourceError } from "../../model/errors";

/**
 * Simula o atraso de uma chamada assíncrona (rede/banco) e converte qualquer
 * erro técnico em DataSourceError, para que nada "vaze" da infraestrutura.
 */
export async function withLatency<T>(
  delayMs: number,
  operation: () => T,
  failureMessage: string
): Promise<T> {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
    return operation();
  } catch {
    throw new DataSourceError(failureMessage);
  }
}
