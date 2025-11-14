# LISTO - Neurodivergent-Friendly Health & Wellness Platform

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

## Overview

**LISTO** is a comprehensive health and wellness platform specifically designed for neurodivergent individuals (ADHD, autism spectrum). The platform has been converted from a TypeScript/Next.js application to a modern Python/FastAPI backend with enhanced features, improved architecture, and better scalability.

### Key Features

🧠 **Neurodivergent-Friendly Design**
- Focus mode with reduced motion
- ADHD-friendly task breakdown
- Autism-friendly detailed tracking
- High contrast and accessibility options

💚 **Health Tracking**
- Menstrual cycle tracking with insights
- Menopause symptom monitoring
- Mood and weather correlation analysis
- Energy level tracking

🍽️ **ADHD Meal Planner**
- Quick-action recipe management
- AI-powered meal scheduling
- Interactive meal calendar
- Smart shopping lists
- Gamification elements

🏥 **Medical Hub**
- Appointment management
- Medication reminders
- Health goal tracking
- Disease prevention resources

🎯 **Additional Features**
- Vision board for goal visualization
- Anonymous peer support (Resonance Circles)
- Privacy-first data storage
- Research-backed recommendations

## Architecture

### Backend (New Python Implementation)

- **FastAPI** - Modern async Python web framework
- **PostgreSQL** - Robust relational database
- **Redis** - Caching and session management
- **SQLAlchemy** - Powerful ORM with type safety
- **Alembic** - Database migrations
- **JWT Authentication** - Secure token-based auth
- **Pydantic** - Data validation and serialization

### Frontend (Enhanced from Original)

- **React 18+** with TypeScript
- **Next.js** - Server-side rendering and routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Query** - Server state management

### Key Improvements from Original

1. **Better Architecture**
   - Clean separation of concerns
   - Modular API design
   - Type-safe data models
   - Comprehensive error handling

2. **Enhanced Performance**
   - Async database operations
   - Connection pooling
   - Redis caching layer
   - Optimized queries

3. **Improved Security**
   - JWT token authentication
   - Password hashing with bcrypt
   - CORS protection
   - SQL injection prevention
   - Input validation

4. **Scalability**
   - Horizontal scaling support
   - Database read replicas
   - Load balancer ready
   - Docker containerization

5. **Developer Experience**
   - Auto-generated API docs
   - Comprehensive testing
   - Database migrations
   - Type hints throughout
   - Clear code structure

## Quick Start

### Using Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/TajinTweaker23/LISTO.git
cd LISTO

# Start backend services
cd backend
docker-compose up -d

# In another terminal, start frontend
cd ..
npm install
npm run dev
```

Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Manual Setup

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## Project Structure

```
LISTO/
├── backend/                    # Python/FastAPI backend
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utilities
│   │   ├── config.py          # Configuration
│   │   ├── database.py        # Database setup
│   │   └── main.py            # FastAPI app
│   ├── alembic/               # Database migrations
│   ├── tests/                 # Test suite
│   ├── scripts/               # Utility scripts
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile             # Docker config
│   └── docker-compose.yml     # Docker Compose
├── app/                        # Next.js pages
├── components/                 # React components
├── styles/                     # CSS and design system
├── public/                     # Static assets
├── types/                      # TypeScript types
├── lib/                        # Utilities
├── package.json               # Node dependencies
└── DEPLOYMENT_GUIDE.md        # Deployment instructions
```

## API Documentation

The backend automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token

#### Health Tracking
- `POST /api/v1/health/cycle` - Log cycle data
- `GET /api/v1/health/cycle` - Get cycle history
- `POST /api/v1/health/mood` - Log mood entry
- `GET /api/v1/health/mood` - Get mood history
- `GET /api/v1/health/insights` - Get AI insights

#### Meal Planning
- `GET /api/v1/meals/recipes` - List recipes
- `POST /api/v1/meals/recipes` - Create recipe
- `GET /api/v1/meals/plans` - Get meal plans

#### Medical Hub
- `GET /api/v1/medical/appointments` - List appointments
- `POST /api/v1/medical/appointments` - Create appointment
- `GET /api/v1/medical/medications` - List medications
- `POST /api/v1/medical/medications` - Add medication

## Development

### Backend Development

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest

# Run with auto-reload
uvicorn app.main:app --reload
```

### Frontend Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

### Code Quality

```bash
# Backend
cd backend
black app/              # Format code
flake8 app/            # Lint
mypy app/              # Type checking
pytest --cov=app       # Test with coverage

# Frontend
npm run lint           # ESLint
npm run type-check     # TypeScript check
```

## Testing

### Backend Tests

```bash
cd backend
pytest                              # Run all tests
pytest --cov=app                    # With coverage
pytest tests/test_api/test_auth.py  # Specific test
```

### Frontend Tests

```bash
npm test                 # Run all tests
npm test -- --coverage   # With coverage
```

## Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions including:

- Local development setup
- Docker deployment
- Production deployment
- Nginx configuration
- SSL setup
- Database management
- Monitoring and logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- **Backend**: Follow PEP 8, use Black for formatting
- **Frontend**: Follow ESLint config, use Prettier
- **Commits**: Use conventional commits format

## Migration from Original

The original TypeScript/Firebase implementation has been migrated to:

- **Firebase → PostgreSQL**: More robust, self-hosted database
- **Next.js API Routes → FastAPI**: Better performance, auto docs
- **Firebase Auth → JWT**: More control, easier to customize
- **Firestore → SQLAlchemy**: Type-safe, relational data modeling

### Data Migration

If you have existing data from the original Firebase implementation, contact the maintainers for migration scripts.

## Documentation

- [Backend README](backend/README.md) - Backend setup and API details
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deployment instructions
- [HEALTH_README.md](HEALTH_README.md) - Health tracking features
- [ADHD_MEAL_PLANNER_README.md](ADHD_MEAL_PLANNER_README.md) - Meal planner guide

## License

ISC License - see LICENSE file for details

## Acknowledgments

- Original LISTO application by TajinTweaker23
- FastAPI framework by Sebastián Ramírez
- React and Next.js by Vercel
- All contributors and supporters

## Support

- **Issues**: [GitHub Issues](https://github.com/TajinTweaker23/LISTO/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TajinTweaker23/LISTO/discussions)

---

**Built with ❤️ for the neurodivergent community**
