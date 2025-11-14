"""
Medical Hub Models
Database models for appointments, medications, and health goals
"""
from datetime import datetime, date, time
from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    DateTime,
    Date,
    Time,
    Text,
    JSON,
    ForeignKey,
)
from app.database import Base


class Appointment(Base):
    """Medical appointment tracking"""

    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Appointment details
    title = Column(String, nullable=False)
    doctor_name = Column(String, nullable=True)
    specialty = Column(String, nullable=True)
    location = Column(String, nullable=True)
    
    # Scheduling
    appointment_date = Column(Date, nullable=False)
    appointment_time = Column(Time, nullable=True)
    duration = Column(Integer, nullable=True)  # minutes
    
    # Reminder settings
    reminder_enabled = Column(Boolean, default=True)
    reminder_minutes_before = Column(Integer, default=60)
    
    # Notes and follow-up
    notes = Column(Text, nullable=True)
    preparation_notes = Column(Text, nullable=True)  # What to bring, questions to ask
    follow_up_required = Column(Boolean, default=False)
    
    # Status
    is_completed = Column(Boolean, default=False)
    is_cancelled = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Medication(Base):
    """Medication tracking and reminders"""

    __tablename__ = "medications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Medication information
    name = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    form = Column(String, nullable=True)  # pill, liquid, injection, etc.
    purpose = Column(String, nullable=True)
    
    # Schedule
    frequency = Column(String, nullable=False)  # daily, twice_daily, as_needed, etc.
    times = Column(JSON, default=[])  # ["08:00", "20:00"] for specific times
    
    # Tracking
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    refill_date = Column(Date, nullable=True)
    
    # Reminders
    reminder_enabled = Column(Boolean, default=True)
    
    # Notes
    side_effects = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class HealthGoal(Base):
    """Health and wellness goals tracking"""

    __tablename__ = "health_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Goal information
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False)  # fitness, nutrition, mental_health, etc.
    
    # Target and progress
    target_value = Column(Integer, nullable=True)
    current_value = Column(Integer, default=0)
    unit = Column(String, nullable=True)  # steps, glasses, minutes, etc.
    
    # Timeline
    start_date = Column(Date, nullable=False)
    target_date = Column(Date, nullable=True)
    
    # ADHD-friendly features
    breakdown_steps = Column(JSON, default=[])  # Smaller, manageable steps
    reward_system = Column(JSON, default={})  # Gamification elements
    
    # Status
    is_completed = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
