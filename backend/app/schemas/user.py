"""
User Schemas
Pydantic models for user-related requests and responses
"""
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user registration"""
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    """Schema for user profile updates"""
    full_name: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None


class UserResponse(UserBase):
    """Schema for user response"""
    id: int
    is_active: bool
    is_verified: bool
    preferences: Dict[str, Any] = {}
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    """JWT token response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token payload data"""
    user_id: Optional[int] = None
    username: Optional[str] = None
