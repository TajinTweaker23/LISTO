# LISTO Backend - Python/FastAPI

## Overview

Modern Python backend for LISTO - a neurodivergent-friendly health & wellness application.

## Features

- **FastAPI** - Modern, fast (high-performance) web framework
- **PostgreSQL** - Robust relational database
- **Redis** - Caching and session management
- **SQLAlchemy** - Powerful ORM
- **JWT Authentication** - Secure token-based auth
- **AI/ML Integration** - Pattern recognition and insights
- **RESTful API** - Clean, well-documented endpoints
- **WebSocket Support** - Real-time features

## Setup Instructions

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis 6+ (optional)

### Installation

1. **Create virtual environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize database**
   ```bash
   python scripts/init_db.py
   alembic upgrade head
   ```

5. **Run development server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Application
APP_NAME=LISTO
APP_VERSION=1.0.0
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production

# Database
DATABASE_URL=postgresql://listo_user:listo_password@localhost:5432/listo_db
DATABASE_ECHO=False

# Redis (optional)
REDIS_URL=redis://localhost:6379/0

# Authentication
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
ALGORITHM=HS256

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# AI/ML (optional)
OPENAI_API_KEY=your-openai-key-if-needed
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_api/test_health.py
```

## Code Quality

```bash
# Format code
black app/

# Lint
flake8 app/
pylint app/

# Type checking
mypy app/
```

## Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1
```

## Deployment

### Using Docker

```bash
docker build -t listo-backend .
docker run -p 8000:8000 listo-backend
```

### Using Docker Compose

```bash
docker-compose up -d
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Health Tracking
- `GET /api/v1/health/cycle` - Get cycle data
- `POST /api/v1/health/cycle` - Log cycle data
- `GET /api/v1/health/mood` - Get mood history
- `POST /api/v1/health/mood` - Log mood entry
- `GET /api/v1/health/insights` - Get AI insights

### Meal Planning
- `GET /api/v1/meals/recipes` - List recipes
- `POST /api/v1/meals/recipes` - Create recipe
- `GET /api/v1/meals/plan` - Get meal plan
- `POST /api/v1/meals/plan` - Create meal plan

### Medical Hub
- `GET /api/v1/medical/appointments` - List appointments
- `POST /api/v1/medical/appointments` - Create appointment
- `GET /api/v1/medical/medications` - List medications
- `POST /api/v1/medical/medications` - Add medication

## License

ISC
