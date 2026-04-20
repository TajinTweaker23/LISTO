"""
Test Authentication API
Tests for user registration, login, and token management
"""
import pytest
from fastapi import status


def test_register_user(client):
    """Test user registration"""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword123",
            "full_name": "Test User"
        }
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert "hashed_password" not in data


def test_register_duplicate_user(client):
    """Test registering duplicate user fails"""
    # Register first user
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    
    # Try to register again
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_login_user(client):
    """Test user login"""
    # Register user first
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    
    # Login
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "testuser", "password": "testpassword123"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "nonexistent", "password": "wrongpassword"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
