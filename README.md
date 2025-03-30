# Fit2025 - Aplicativo de Controle de Peso

Um aplicativo web para acompanhar sua jornada de perda de peso, desenvolvido com React, TypeScript, Tailwind CSS e Hono.

## Arquitetura

O projeto é um monorepo contendo:

- **Frontend**: Aplicação React com TypeScript e Tailwind CSS
- **Backend**: API REST com Hono e TypeScript
- **Banco de Dados**: MongoDB

## Funcionalidades

- Acompanhamento de progresso com gráficos
- Histórico de pesos cadastrados
- Autenticação simples para proteger os dados
- Interface responsiva e amigável
- API REST para persistência dos dados
- Containerização com Docker

## Tecnologias utilizadas

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Chart.js para visualização de dados
- Testes com Vitest e Testing Library

### Backend

- Hono (Framework web)
- TypeScript
- MongoDB
- Docker

## Pré-requisitos

- Node.js 18+
- pnpm (gerenciador de pacotes)
- Docker (opcional, para execução em container)

## Instalação e Execução (Local)

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Execute o projeto em modo de desenvolvimento:

   ```bash
   # Para rodar frontend e backend
   pnpm dev

   # Ou separadamente
   pnpm dev:app    # Frontend
   pnpm dev:backend # Backend
   ```

4. Acesse:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## Autenticação

Para editar os dados de peso, é necessário se autenticar. A senha padrão é:

```
$Gustavo89fra
```

## Execução com Docker

1. Construa as imagens e inicie os containers:
   ```bash
   docker-compose up -d
   ```
2. Acesse:
   - Frontend: `http://localhost:8080`
   - Backend: `http://localhost:3000`
   - MongoDB: `mongodb://root:password@localhost:27017`

## Testes

Execute os testes de integração:

```bash
pnpm test
```

Para testes com cobertura:

```bash
pnpm run test:coverage
```

## Build de produção

Para gerar builds otimizadas para produção:

```bash
# Build de todos os projetos
pnpm build

# Ou individualmente
cd app && pnpm build     # Frontend
cd backend && pnpm build # Backend
```

Os arquivos serão gerados nas pastas:

- Frontend: `app/dist`
- Backend: `backend/dist`
