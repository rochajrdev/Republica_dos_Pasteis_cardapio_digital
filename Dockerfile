FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Build do projeto Next.js
RUN npm run build

# Porta do frontend
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "start"]
