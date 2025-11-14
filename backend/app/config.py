"""
Application Configuration
Manages environment variables and application settings
"""
from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator


class Settings(BaseSettings):
    """Application settings from environment variables"""

    # Application
    APP_NAME: str = "LISTO"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Database
    DATABASE_URL: str
    DATABASE_ECHO: bool = False

    # Redis (optional)
    REDIS_URL: str = "redis://localhost:6379/0"

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]

    # AI/ML (optional)
    OPENAI_API_KEY: str = ""

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        """Parse CORS origins from string or list"""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
