"""
Meal Planning Models
Database models for recipes, meal plans, and shopping lists
"""
from datetime import datetime, date
from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    DateTime,
    Date,
    Float,
    Text,
    JSON,
    ForeignKey,
)
from app.database import Base


class Recipe(Base):
    """Recipe database model"""

    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Recipe information
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    
    # Categorization
    meal_type = Column(String, nullable=True)  # breakfast, lunch, dinner, snack
    cuisine = Column(String, nullable=True)
    difficulty = Column(String, nullable=True)  # easy, medium, hard
    prep_time = Column(Integer, nullable=True)  # minutes
    cook_time = Column(Integer, nullable=True)  # minutes
    
    # Recipe details
    ingredients = Column(JSON, default=[])
    instructions = Column(JSON, default=[])
    nutrition = Column(JSON, default={})  # calories, protein, carbs, etc.
    
    # ADHD-friendly features
    is_quick_meal = Column(Boolean, default=False)  # < 30 minutes
    adhd_friendly = Column(Boolean, default=False)
    tags = Column(JSON, default=[])
    
    # User engagement
    is_favorite = Column(Boolean, default=False)
    times_cooked = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class MealPlan(Base):
    """Weekly meal plan"""

    __tablename__ = "meal_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Planning period
    week_start = Column(Date, nullable=False)
    week_end = Column(Date, nullable=False)
    
    # Meal assignments
    meals = Column(JSON, default={})  # {"monday_breakfast": recipe_id, ...}
    
    # Status
    is_active = Column(Boolean, default=True)
    completion_rate = Column(Float, default=0.0)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ShoppingList(Base):
    """Shopping list for meal plans"""

    __tablename__ = "shopping_lists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    meal_plan_id = Column(Integer, ForeignKey("meal_plans.id"), nullable=True)
    
    # List information
    name = Column(String, nullable=False)
    items = Column(JSON, default=[])  # [{"name": "eggs", "quantity": "12", "checked": false}, ...]
    
    # Organization
    categories = Column(JSON, default={})  # Group items by category
    
    # Status
    is_completed = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
