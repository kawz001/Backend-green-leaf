import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# Adiciona o diretório raiz do projeto ao PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from database.db_config import Base  # Importa os modelos do banco de dados
from database.models.trail import Trail  # Importa o modelo para garantir que ele esteja registrado

# Configurações do Alembic
config = context.config
fileConfig(config.config_file_name)
target_metadata = Base.metadata  # Define a metadata como Base.metadata para que o Alembic detecte as tabelas

def run_migrations_offline():
    """Executa migrações em modo offline (somente DDL)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Executa migrações em modo online (conecta ao banco de dados)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
