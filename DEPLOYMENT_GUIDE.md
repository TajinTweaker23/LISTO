# LISTO - Complete Python Conversion Deployment Guide

## Overview

This document provides comprehensive instructions for deploying the Python-based LISTO application.

## Architecture

### Technology Stack

**Backend:**
- FastAPI (Python web framework)
- PostgreSQL (primary database)
- Redis (caching and sessions)
- SQLAlchemy (ORM)
- Alembic (database migrations)

**Frontend:**
- React 18+ with TypeScript
- Next.js (kept from original)
- Tailwind CSS
- React Query for API state management

**Deployment:**
- Docker & Docker Compose
- Nginx (reverse proxy)
- Gunicorn/Uvicorn (ASGI server)

## Local Development Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (optional)
- Docker & Docker Compose (for containerized setup)

### Method 1: Docker Compose (Recommended)

```bash
# Navigate to backend directory
cd backend

# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f backend

# API will be available at http://localhost:8000
# Documentation at http://localhost:8000/docs
```

### Method 2: Manual Setup

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Initialize database
python scripts/init_db.py

# Run migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Update .env.local with backend URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
```

## Database Setup

### PostgreSQL Installation

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Start PostgreSQL
sudo service postgresql start  # Linux
brew services start postgresql  # macOS
```

### Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE listo_db;
CREATE USER listo_user WITH PASSWORD 'listo_password';
GRANT ALL PRIVILEGES ON DATABASE listo_db TO listo_user;
\q
```

### Run Migrations

```bash
cd backend

# Initialize Alembic (if not already done)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

## Production Deployment

### Environment Variables

Create a `.env` file with production values:

```env
# Application
APP_NAME=LISTO
APP_VERSION=1.0.0
DEBUG=False
SECRET_KEY=<generate-a-strong-random-secret>

# Database
DATABASE_URL=postgresql://user:password@hostname:5432/database

# Redis
REDIS_URL=redis://hostname:6379/0

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Security
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### Docker Production Deployment

```bash
# Build production image
docker build -t listo-backend:latest .

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Production Deployment

#### 1. Install System Dependencies

```bash
sudo apt-get update
sudo apt-get install -y python3.11 python3.11-venv postgresql nginx
```

#### 2. Setup Application

```bash
# Create app directory
sudo mkdir -p /var/www/listo
cd /var/www/listo

# Clone repository
git clone https://github.com/TajinTweaker23/LISTO.git .

# Setup backend
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with production values

# Initialize database
python scripts/init_db.py
alembic upgrade head
```

#### 3. Setup Gunicorn Service

Create `/etc/systemd/system/listo-backend.service`:

```ini
[Unit]
Description=LISTO Backend API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/listo/backend
Environment="PATH=/var/www/listo/backend/venv/bin"
ExecStart=/var/www/listo/backend/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable listo-backend
sudo systemctl start listo-backend
sudo systemctl status listo-backend
```

#### 4. Setup Nginx

Create `/etc/nginx/sites-available/listo`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # API Backend
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/listo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_api/test_auth.py
```

### Frontend Tests

```bash
# Run Next.js tests
npm test
```

## API Documentation

Once deployed, access API documentation at:
- Swagger UI: `http://your-domain/docs`
- ReDoc: `http://your-domain/redoc`

## Monitoring & Logging

### Application Logs

```bash
# View backend logs
sudo journalctl -u listo-backend -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health Checks

```bash
# Backend health check
curl http://localhost:8000/health

# Database connection check
curl http://localhost:8000/api/v1/health/check
```

## Backup & Restore

### Database Backup

```bash
# Backup database
pg_dump -U listo_user listo_db > backup_$(date +%Y%m%d).sql

# Restore database
psql -U listo_user listo_db < backup_20240101.sql
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check DATABASE_URL in .env
   - Verify PostgreSQL is running
   - Check firewall rules

2. **Import Errors**
   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r requirements.txt`

3. **Migration Errors**
   - Reset migrations: `alembic downgrade base`
   - Recreate migrations: `alembic upgrade head`

4. **CORS Errors**
   - Verify ALLOWED_ORIGINS in .env
   - Check frontend API_URL configuration

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx, HAProxy)
- Run multiple backend instances
- Configure session storage in Redis
- Use read replicas for database

### Performance Optimization

- Enable Redis caching
- Use connection pooling
- Optimize database queries
- Enable CDN for static assets
- Use async operations where possible

## Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Use HTTPS in production
- [ ] Enable CORS only for trusted origins
- [ ] Implement rate limiting
- [ ] Regular security updates
- [ ] Database backups
- [ ] Secure environment variables
- [ ] Use strong passwords
- [ ] Enable PostgreSQL SSL
- [ ] Implement logging and monitoring

## Support

For issues or questions:
- GitHub Issues: https://github.com/TajinTweaker23/LISTO/issues
- Documentation: See README files in each directory
