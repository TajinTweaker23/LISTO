"""
Medical Hub API Routes
Endpoints for appointments, medications, and health goals
"""
from typing import Any, List
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.medical import Appointment, Medication, HealthGoal

router = APIRouter()


# Appointments Endpoints
@router.get("/appointments")
async def get_appointments(
    upcoming_only: bool = Query(default=True),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get user's appointments"""
    query = db.query(Appointment).filter(
        Appointment.user_id == current_user.id,
        Appointment.is_cancelled == False
    )
    
    if upcoming_only:
        today = datetime.utcnow().date()
        query = query.filter(Appointment.appointment_date >= today)
    
    appointments = query.order_by(Appointment.appointment_date).all()
    return appointments


@router.post("/appointments", status_code=status.HTTP_201_CREATED)
async def create_appointment(
    appointment_data: dict,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new appointment"""
    new_appointment = Appointment(
        user_id=current_user.id,
        **appointment_data
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment


# Medications Endpoints
@router.get("/medications")
async def get_medications(
    active_only: bool = Query(default=True),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get user's medications"""
    query = db.query(Medication).filter(Medication.user_id == current_user.id)
    
    if active_only:
        query = query.filter(Medication.is_active == True)
    
    medications = query.order_by(Medication.name).all()
    return medications


@router.post("/medications", status_code=status.HTTP_201_CREATED)
async def create_medication(
    medication_data: dict,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Add a new medication"""
    new_medication = Medication(
        user_id=current_user.id,
        **medication_data
    )
    db.add(new_medication)
    db.commit()
    db.refresh(new_medication)
    return new_medication


# Health Goals Endpoints
@router.get("/goals")
async def get_health_goals(
    active_only: bool = Query(default=True),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get user's health goals"""
    query = db.query(HealthGoal).filter(HealthGoal.user_id == current_user.id)
    
    if active_only:
        query = query.filter(
            HealthGoal.is_completed == False,
            HealthGoal.is_archived == False
        )
    
    goals = query.order_by(HealthGoal.created_at.desc()).all()
    return goals


@router.post("/goals", status_code=status.HTTP_201_CREATED)
async def create_health_goal(
    goal_data: dict,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new health goal"""
    new_goal = HealthGoal(
        user_id=current_user.id,
        **goal_data
    )
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal
