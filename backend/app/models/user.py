"""
User Model
Database model for user authentication and profile
"""
from datetime import datetime
from sqlalchemy import Boolean, Column, Integer, String, DateTime, JSON
from app.database import Base


class User(Base):
    """User model for authentication and profile"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # Profile information
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Neurodivergent-specific preferences
    preferences = Column(JSON, default={})  # Accessibility settings, focus mode, etc.
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, username={self.username})>"
