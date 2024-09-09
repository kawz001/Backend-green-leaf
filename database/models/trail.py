from sqlalchemy import Column, Integer, String, Enum
from database.db_config import Base

class Trail(Base):
    """
    Define a tabela 'trails' no banco de dados, representando trilhas com suas propriedades.

    Atributos:
        id (int): Identificador único da trilha.
        name (str): Nome da trilha.
        description (str): Descrição da trilha.
        difficulty (Enum): Dificuldade da trilha, podendo ser 'easy', 'medium' ou 'hard'.
        location (str): Localização da trilha.
    """
    __tablename__ = 'trails'

    id = Column(Integer, primary_key=True, index=True, doc="Identificador único da trilha")
    name = Column(String, nullable=False, doc="Nome da trilha")
    description = Column(String, nullable=True, doc="Descrição da trilha")
    difficulty = Column(
        Enum('easy', 'medium', 'hard', name='difficulty_enum'), 
        nullable=False, 
        doc="Dificuldade da trilha: easy, medium ou hard"
    )
    location = Column(String, nullable=False, doc="Localização da trilha")
