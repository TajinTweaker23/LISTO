"""
Database Initialization Script
Creates all tables and initial data
"""
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import Base, engine
from app.models import (
    User,
    CycleData,
    MoodEntry,
    MenopauseData,
    HealthInsight,
    Recipe,
    MealPlan,
    ShoppingList,
    Appointment,
    Medication,
    HealthGoal,
)


def init_db():
    """Initialize database - create all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    print("\nCreated tables:")
    for table in Base.metadata.tables:
        print(f"  - {table}")


if __name__ == "__main__":
    init_db()
