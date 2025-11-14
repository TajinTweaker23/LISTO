"""
Health Tracking Models
Database models for health-related data (cycle, mood, menopause)
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
from sqlalchemy.orm import relationship
from app.database import Base


class CycleData(Base):
    """Menstrual cycle tracking"""

    __tablename__ = "cycle_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Cycle information
    date = Column(Date, nullable=False)
    flow_level = Column(String, nullable=True)  # light, medium, heavy
    symptoms = Column(JSON, default=[])  # List of symptoms with severity
    mood = Column(String, nullable=True)
    energy_level = Column(Integer, nullable=True)  # 1-10 scale
    
    # Additional tracking
    notes = Column(Text, nullable=True)
    pain_level = Column(Integer, nullable=True)  # 1-10 scale
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class MoodEntry(Base):
    """Mood and weather correlation tracking"""

    __tablename__ = "mood_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Mood data
    date = Column(DateTime, nullable=False, default=datetime.utcnow)
    mood = Column(String, nullable=False)  # happy, anxious, focused, etc.
    energy_level = Column(Integer, nullable=False)  # 1-10 scale
    focus_level = Column(Integer, nullable=True)  # 1-10 scale
    
    # Weather correlation
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    barometric_pressure = Column(Float, nullable=True)
    weather_condition = Column(String, nullable=True)
    
    # Additional context
    notes = Column(Text, nullable=True)
    tags = Column(JSON, default=[])
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)


class MenopauseData(Base):
    """Menopause symptom tracking"""

    __tablename__ = "menopause_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Tracking information
    date = Column(Date, nullable=False)
    stage = Column(String, nullable=True)  # perimenopause, menopause, postmenopause
    
    # Symptoms
    hot_flash_count = Column(Integer, default=0)
    hot_flash_intensity = Column(Integer, nullable=True)  # 1-10 scale
    night_sweats = Column(Boolean, default=False)
    mood_changes = Column(JSON, default=[])
    cognitive_symptoms = Column(JSON, default=[])  # brain fog, memory issues
    
    # Additional tracking
    sleep_quality = Column(Integer, nullable=True)  # 1-10 scale
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class HealthInsight(Base):
    """AI-generated health insights and patterns"""

    __tablename__ = "health_insights"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Insight information
    insight_type = Column(String, nullable=False)  # cycle, mood, menopause, etc.
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    confidence_score = Column(Float, nullable=True)  # 0.0-1.0
    
    # Supporting data
    data_points = Column(JSON, default={})
    recommendations = Column(JSON, default=[])
    research_citations = Column(JSON, default=[])
    
    # Visibility
    is_read = Column(Boolean, default=False)
    is_dismissed = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
