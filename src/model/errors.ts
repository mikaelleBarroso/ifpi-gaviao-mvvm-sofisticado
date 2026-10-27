// Erros puros do domínio. A infraestrutura converte erros técnicos para estes,
// os Use Cases lançam estes, e a ViewModel os transforma em mensagens para a View.
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** Dados de entrada inválidos (regra de negócio violada). */
export class ValidationError extends DomainError {}

/** Falha ao acessar a fonte de dados (rede, banco, arquivo...). */
export class DataSourceError extends DomainError {}

/** O item solicitado não existe. */
export class NotFoundError extends DomainError {}
