FROM python:3.11-slim-buster

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instala as dependências necessárias
RUN pip install --no-cache-dir psycopg2-binary sqlalchemy alembic

# Copia todos os arquivos e diretórios do projeto para o contêiner
COPY . .

# Define o diretório de trabalho para o Alembic
WORKDIR /app/database

# Executa o comando Alembic para gerar e aplicar migrações automaticamente
CMD alembic revision --autogenerate -m "Auto migration" && alembic upgrade head
