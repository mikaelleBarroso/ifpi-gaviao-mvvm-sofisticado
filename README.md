# 🦅 Cardápio Digital IFPI Gavião — MVVM Sofisticado

Atividade de PDM (prof. Iallen Gábio): app em React Native + Expo + TypeScript organizado
conforme o Capítulo 10 do livro de PDM (Clean Architecture e Inversão de Dependências).

## Como rodar

```bash
npm install
npx expo start      # escaneie o QR code com o Expo Go
npm test            # testes unitários dos Use Cases
```

## Fluxo de dependências

```
View (src/app, src/view) → ViewModel → Use Cases (interfaces) → Domínio (src/model)
                                                                     ↑
                                              Infra (src/infra) implementa os contratos
                                              e é ligada pelo DI (src/di/container.ts)
```

## Estrutura

```
src/
├── app/                     rotas finas (Expo Router): index, categoria/[id], produto/[id]
├── view/                    componentes visuais, tema e formatação
├── viewmodel/               hooks que expõem State + Actions; recebem o Use Case por parâmetro
├── usecase/                 iMenuUseCases.ts (contrato) e menuUseCases.ts (regras de negócio)
├── di/container.ts          Composition Root: instancia a infra e monta os Use Cases
├── model/
│   ├── entities/            Category, Product (entidades puras)
│   ├── datasources/         iCategoryDataSource, iProductDataSource (contratos)
│   └── errors.ts            DomainError, ValidationError, DataSourceError, NotFoundError
└── infra/datasources/       implementações em memória com atraso assíncrono
```

## Decisões de arquitetura

- **Regras de negócio só nos Use Cases:** validação de identificadores, categoria inexistente
  e limites de quantidade (1 a 10) ficam em `menuUseCases.ts`.
- **Dependência só de abstrações:** ViewModels e Use Cases importam apenas interfaces (`I...`).
- **Infra isolada:** `withLatency` converte qualquer erro técnico em `DataSourceError`.
- **Erros estruturados:** a ViewModel usa `err instanceof DomainError` para montar a mensagem;
  a View nunca faz `try/catch`.
- **Trocar a fonte de dados** (Supabase, Firebase, API) exige mudar só `src/di/container.ts`.
