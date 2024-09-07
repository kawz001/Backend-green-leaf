from sqlalchemy import Column, Integer, String, Enum
from database.db_config import Base

class Trail(Base):
    __tablename__ = 'trails'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    difficulty = Column(Enum('easy', 'medium', 'hard', name='difficulty_enum'), nullable=False)
    location = Column(String, nullable=False)
