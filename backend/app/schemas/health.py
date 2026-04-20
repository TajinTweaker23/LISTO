"""
Health Schemas
Pydantic models for health tracking requests and responses
"""
from datetime import datetime, date
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class CycleDataCreate(BaseModel):
    """Schema for creating cycle data entry"""
    date: date
    flow_level: Optional[str] = Field(None, pattern="^(light|medium|heavy)$")
    symptoms: List[Dict[str, Any]] = []
    mood: Optional[str] = None
    energy_level: Optional[int] = Field(None, ge=1, le=10)
    pain_level: Optional[int] = Field(None, ge=1, le=10)
    notes: Optional[str] = None


class CycleDataResponse(CycleDataCreate):
    """Schema for cycle data response"""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MoodEntryCreate(BaseModel):
    """Schema for creating mood entry"""
    mood: str
    energy_level: int = Field(..., ge=1, le=10)
    focus_level: Optional[int] = Field(None, ge=1, le=10)
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    barometric_pressure: Optional[float] = None
    weather_condition: Optional[str] = None
    notes: Optional[str] = None
    tags: List[str] = []


class MoodEntryResponse(MoodEntryCreate):
    """Schema for mood entry response"""
    id: int
    user_id: int
    date: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class MenopauseDataCreate(BaseModel):
    """Schema for creating menopause data"""
    date: date
    stage: Optional[str] = Field(None, pattern="^(perimenopause|menopause|postmenopause)$")
    hot_flash_count: int = Field(default=0, ge=0)
    hot_flash_intensity: Optional[int] = Field(None, ge=1, le=10)
    night_sweats: bool = False
    mood_changes: List[str] = []
    cognitive_symptoms: List[str] = []
    sleep_quality: Optional[int] = Field(None, ge=1, le=10)
    notes: Optional[str] = None


class MenopauseDataResponse(MenopauseDataCreate):
    """Schema for menopause data response"""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class HealthInsightResponse(BaseModel):
    """Schema for health insight response"""
    id: int
    user_id: int
    insight_type: str
    title: str
    description: str
    confidence_score: Optional[float] = None
    data_points: Dict[str, Any] = {}
    recommendations: List[str] = []
    research_citations: List[Dict[str, str]] = []
    is_read: bool
    is_dismissed: bool
    created_at: datetime

    class Config:
        from_attributes = True
