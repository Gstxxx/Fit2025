# Aplicativo de Controle de Peso

Um aplicativo web para acompanhar sua jornada de perda de peso, desenvolvido com React, TypeScript e Tailwind CSS.

## Funcionalidades

- Acompanhamento de progresso com gráficos
- Histórico de pesos cadastrados
- Autenticação simples para proteger os dados
- Interface responsiva e amigável
- Armazenamento local dos dados no navegador

## Tecnologias utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Chart.js para visualização de dados
- Testes com Vitest e Testing Library
- Docker para containerização

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker (opcional, para execução em container)

## Instalação e Execução (Local)

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse no navegador: `http://localhost:5173`

## Autenticação

Para editar os dados de peso, é necessário se autenticar. A senha padrão é:

```
$Gustavo89fra
```

## Execução com Docker

1. Construa a imagem e inicie o container:
   ```
   docker-compose up -d
   ```
2. Acesse no navegador: `http://localhost:8080`

## Testes

Execute os testes de integração:
```
npm test
```

Para testes com cobertura:
```
npm run test:coverage
```

## Build de produção

Para gerar uma build otimizada para produção:
```
npm run build
```

Os arquivos serão gerados na pasta `dist` e podem ser servidos por qualquer servidor web. 