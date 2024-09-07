# Etapa base para Python
FROM python:3.9-slim as python-base

WORKDIR /app
COPY database/requirements.txt ./database/
RUN pip install --no-cache-dir -r database/requirements.txt

# Etapa base para Node.js
FROM node:16-alpine as node-base

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install

# Copiando código para o Node.js
COPY backend/src ./src
COPY --from=python-base /app/database /app/database  # Copia dependências e código Python

# Executa o comando padrão
CMD ["npm", "run", "dev"]
