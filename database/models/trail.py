from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from database.db_config import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    profile_picture = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relacionamentos
    trails_created = relationship('Trail', back_populates='creator', cascade="all, delete-orphan")
    comments = relationship('TrailComment', back_populates='user', cascade="all, delete-orphan")
    ratings = relationship('TrailRating', back_populates='user', cascade="all, delete-orphan")
    trails = relationship('UserTrail', back_populates='user', cascade="all, delete-orphan")
    bookmarks = relationship('TrailBookmark', back_populates='user', cascade="all, delete-orphan")
    donations = relationship('Donation', back_populates='user', cascade="all, delete-orphan")
    payments = relationship('Payment', back_populates='user', cascade="all, delete-orphan")
    friends = relationship('Friend', foreign_keys='Friend.user_id', back_populates='user', cascade="all, delete-orphan")
    added_friends = relationship('Friend', foreign_keys='Friend.friend_id', back_populates='friend', cascade="all, delete-orphan")

class Trail(Base):
    __tablename__ = 'trails'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    distance = Column(Float, nullable=False)
    difficulty = Column(Enum('easy', 'medium', 'hard', name='difficulty_enum'), nullable=False)
    description = Column(String)
    location = Column(String, nullable=False)
    photo = Column(String, nullable=True)
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relacionamentos
    creator = relationship('User', back_populates='trails_created')
    comments = relationship('TrailComment', back_populates='trail', cascade="all, delete-orphan")
    ratings = relationship('TrailRating', back_populates='trail', cascade="all, delete-orphan")
    users_trails = relationship('UserTrail', back_populates='trail', cascade="all, delete-orphan")
    bookmarks = relationship('TrailBookmark', back_populates='trail', cascade="all, delete-orphan")

class TrailComment(Base):
    __tablename__ = 'trail_comments'

    id = Column(Integer, primary_key=True, index=True)
    trail_id = Column(Integer, ForeignKey('trails.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    comment = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    trail = relationship('Trail', back_populates='comments')
    user = relationship('User', back_populates='comments')

class TrailRating(Base):
    __tablename__ = 'trail_ratings'

    id = Column(Integer, primary_key=True, index=True)
    trail_id = Column(Integer, ForeignKey('trails.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    rating = Column(Integer, nullable=False)  # 1 a 5
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    trail = relationship('Trail', back_populates='ratings')
    user = relationship('User', back_populates='ratings')

class UserTrail(Base):
    __tablename__ = 'user_trails'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    trail_id = Column(Integer, ForeignKey('trails.id'))
    status = Column(Enum('saved', 'completed', 'planned', name='trail_status_enum'))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    user = relationship('User', back_populates='trails')
    trail = relationship('Trail', back_populates='users_trails')

class TrailBookmark(Base):
    __tablename__ = 'trail_bookmarks'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    trail_id = Column(Integer, ForeignKey('trails.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    user = relationship('User', back_populates='bookmarks')
    trail = relationship('Trail', back_populates='bookmarks')

class Donation(Base):
    __tablename__ = 'donations'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    donation_date = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    user = relationship('User', back_populates='donations')

class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    payment_type = Column(Enum('premium', 'promote_trail', name='payment_type_enum'))
    amount = Column(Float, nullable=False)
    payment_date = Column(DateTime, default=datetime.utcnow)

    # Relacionamentos
    user = relationship('User', back_populates='payments')

class Friend(Base):
    __tablename__ = 'friends'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    friend_id = Column(Integer, ForeignKey('users.id'))

    # Relacionamentos
    user = relationship('User', foreign_keys=[user_id], back_populates='friends')
    friend = relationship('User', foreign_keys=[friend_id], back_populates='added_friends')
