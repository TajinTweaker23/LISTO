"""
Health Tracking API Routes
Endpoints for cycle tracking, mood entries, menopause data, and insights
"""
from typing import Any, List
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.health import CycleData, MoodEntry, MenopauseData, HealthInsight
from app.schemas.health import (
    CycleDataCreate,
    CycleDataResponse,
    MoodEntryCreate,
    MoodEntryResponse,
    MenopauseDataCreate,
    MenopauseDataResponse,
    HealthInsightResponse,
)

router = APIRouter()


# Cycle Tracking Endpoints
@router.post("/cycle", response_model=CycleDataResponse, status_code=status.HTTP_201_CREATED)
async def create_cycle_entry(
    cycle_data: CycleDataCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new cycle tracking entry"""
    new_entry = CycleData(
        user_id=current_user.id,
        **cycle_data.model_dump()
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry


@router.get("/cycle", response_model=List[CycleDataResponse])
async def get_cycle_entries(
    days: int = Query(default=30, ge=1, le=365),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get cycle tracking entries for the last N days"""
    start_date = datetime.utcnow().date() - timedelta(days=days)
    entries = db.query(CycleData).filter(
        CycleData.user_id == current_user.id,
        CycleData.date >= start_date
    ).order_by(CycleData.date.desc()).all()
    return entries


# Mood Tracking Endpoints
@router.post("/mood", response_model=MoodEntryResponse, status_code=status.HTTP_201_CREATED)
async def create_mood_entry(
    mood_data: MoodEntryCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new mood entry"""
    new_entry = MoodEntry(
        user_id=current_user.id,
        **mood_data.model_dump()
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry


@router.get("/mood", response_model=List[MoodEntryResponse])
async def get_mood_entries(
    days: int = Query(default=30, ge=1, le=365),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get mood entries for the last N days"""
    start_date = datetime.utcnow() - timedelta(days=days)
    entries = db.query(MoodEntry).filter(
        MoodEntry.user_id == current_user.id,
        MoodEntry.date >= start_date
    ).order_by(MoodEntry.date.desc()).all()
    return entries


# Menopause Tracking Endpoints
@router.post("/menopause", response_model=MenopauseDataResponse, status_code=status.HTTP_201_CREATED)
async def create_menopause_entry(
    menopause_data: MenopauseDataCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Create a new menopause tracking entry"""
    new_entry = MenopauseData(
        user_id=current_user.id,
        **menopause_data.model_dump()
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry


@router.get("/menopause", response_model=List[MenopauseDataResponse])
async def get_menopause_entries(
    days: int = Query(default=30, ge=1, le=365),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get menopause tracking entries for the last N days"""
    start_date = datetime.utcnow().date() - timedelta(days=days)
    entries = db.query(MenopauseData).filter(
        MenopauseData.user_id == current_user.id,
        MenopauseData.date >= start_date
    ).order_by(MenopauseData.date.desc()).all()
    return entries


# Health Insights Endpoints
@router.get("/insights", response_model=List[HealthInsightResponse])
async def get_health_insights(
    insight_type: str = Query(default=None),
    unread_only: bool = Query(default=False),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Get health insights for the user"""
    query = db.query(HealthInsight).filter(
        HealthInsight.user_id == current_user.id,
        HealthInsight.is_dismissed == False
    )
    
    if insight_type:
        query = query.filter(HealthInsight.insight_type == insight_type)
    
    if unread_only:
        query = query.filter(HealthInsight.is_read == False)
    
    insights = query.order_by(HealthInsight.created_at.desc()).all()
    return insights


@router.put("/insights/{insight_id}/mark-read")
async def mark_insight_read(
    insight_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
) -> Any:
    """Mark an insight as read"""
    insight = db.query(HealthInsight).filter(
        HealthInsight.id == insight_id,
        HealthInsight.user_id == current_user.id
    ).first()
    
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    
    insight.is_read = True
    db.commit()
    
    return {"message": "Insight marked as read"}
