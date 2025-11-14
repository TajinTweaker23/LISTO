"""
Meal Planning API Routes
Endpoints for recipes, meal plans, and shopping lists
"""
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.meal import Recipe

router = APIRouter()


@router.get("/recipes")
async def get_recipes(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get all recipes for the user"""
    recipes = db.query(Recipe).filter(Recipe.user_id == current_user.id).all()
    return recipes


@router.post("/recipes", status_code=status.HTTP_201_CREATED)
async def create_recipe(
    recipe_data: dict,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new recipe"""
    new_recipe = Recipe(
        user_id=current_user.id,
        **recipe_data
    )
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)
    return new_recipe


@router.get("/plans")
async def get_meal_plans(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get meal plans"""
    return {"message": "Meal plans endpoint - to be implemented"}


@router.post("/plans", status_code=status.HTTP_201_CREATED)
async def create_meal_plan(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new meal plan"""
    return {"message": "Create meal plan - to be implemented"}
