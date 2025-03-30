FROM node:20-alpine as build

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Construir o aplicativo
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar a build para o diretório do nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração do nginx para single-page application
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 