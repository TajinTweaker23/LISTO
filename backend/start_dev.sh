#!/bin/bash
# Start LISTO Backend Development Server

echo "🚀 Starting LISTO Backend..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Check if database exists
if [ ! -f "listo_dev.db" ]; then
    echo "📊 Initializing database..."
    python scripts/init_db.py
    echo ""
fi

# Start server
echo "✅ Starting FastAPI server..."
echo "📖 API Documentation: http://localhost:8000/docs"
echo "📋 Alternative Docs: http://localhost:8000/redoc"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
