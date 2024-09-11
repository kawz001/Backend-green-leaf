FROM python:3.11-slim-buster

WORKDIR /app

# Instala o cliente PostgreSQL e outras dependências necessárias
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Instala as dependências do Python
RUN pip install --no-cache-dir psycopg2-binary sqlalchemy alembic

# Copia o código da aplicação e o script wait-for-it.sh
COPY . .

# Torna o script executável
RUN chmod +x /app/wait-for-it.sh

WORKDIR /app/database

# Executa o comando Alembic para gerar e aplicar migrações automaticamente
CMD alembic revision --autogenerate -m "Auto migration" && alembic upgrade head
