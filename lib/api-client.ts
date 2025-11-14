/**
 * LISTO API Client
 * 
 * TypeScript client for the Python/FastAPI backend
 * Handles authentication, requests, and error handling
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Token management
const TOKEN_KEY = 'listo_access_token';
const REFRESH_TOKEN_KEY = 'listo_refresh_token';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshAccessToken(refreshToken);
              this.setToken(response.access_token, response.refresh_token);
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Token management methods
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  }

  private setToken(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  // Authentication endpoints
  async register(email: string, username: string, password: string, fullName?: string) {
    const response = await this.client.post('/api/v1/auth/register', {
      email,
      username,
      password,
      full_name: fullName,
    });
    return response.data;
  }

  async login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await this.client.post('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;
    this.setToken(access_token, refresh_token);
    return response.data;
  }

  async refreshAccessToken(refreshToken: string) {
    const response = await this.client.post('/api/v1/auth/refresh', null, {
      params: { refresh_token: refreshToken },
    });
    return response.data;
  }

  logout(): void {
    this.clearTokens();
  }

  // User endpoints
  async getCurrentUser() {
    const response = await this.client.get('/api/v1/users/me');
    return response.data;
  }

  async updateProfile(data: { full_name?: string; preferences?: any }) {
    const response = await this.client.put('/api/v1/users/me', data);
    return response.data;
  }

  // Health tracking endpoints
  async createCycleEntry(data: any) {
    const response = await this.client.post('/api/v1/health/cycle', data);
    return response.data;
  }

  async getCycleEntries(days: number = 30) {
    const response = await this.client.get('/api/v1/health/cycle', {
      params: { days },
    });
    return response.data;
  }

  async createMoodEntry(data: any) {
    const response = await this.client.post('/api/v1/health/mood', data);
    return response.data;
  }

  async getMoodEntries(days: number = 30) {
    const response = await this.client.get('/api/v1/health/mood', {
      params: { days },
    });
    return response.data;
  }

  async createMenopauseEntry(data: any) {
    const response = await this.client.post('/api/v1/health/menopause', data);
    return response.data;
  }

  async getMenopauseEntries(days: number = 30) {
    const response = await this.client.get('/api/v1/health/menopause', {
      params: { days },
    });
    return response.data;
  }

  async getHealthInsights(insightType?: string, unreadOnly?: boolean) {
    const response = await this.client.get('/api/v1/health/insights', {
      params: { insight_type: insightType, unread_only: unreadOnly },
    });
    return response.data;
  }

  async markInsightRead(insightId: number) {
    const response = await this.client.put(`/api/v1/health/insights/${insightId}/mark-read`);
    return response.data;
  }

  // Meal planning endpoints
  async getRecipes() {
    const response = await this.client.get('/api/v1/meals/recipes');
    return response.data;
  }

  async createRecipe(data: any) {
    const response = await this.client.post('/api/v1/meals/recipes', data);
    return response.data;
  }

  async getMealPlans() {
    const response = await this.client.get('/api/v1/meals/plans');
    return response.data;
  }

  async createMealPlan(data: any) {
    const response = await this.client.post('/api/v1/meals/plans', data);
    return response.data;
  }

  // Medical hub endpoints
  async getAppointments(upcomingOnly: boolean = true) {
    const response = await this.client.get('/api/v1/medical/appointments', {
      params: { upcoming_only: upcomingOnly },
    });
    return response.data;
  }

  async createAppointment(data: any) {
    const response = await this.client.post('/api/v1/medical/appointments', data);
    return response.data;
  }

  async getMedications(activeOnly: boolean = true) {
    const response = await this.client.get('/api/v1/medical/medications', {
      params: { active_only: activeOnly },
    });
    return response.data;
  }

  async createMedication(data: any) {
    const response = await this.client.post('/api/v1/medical/medications', data);
    return response.data;
  }

  async getHealthGoals(activeOnly: boolean = true) {
    const response = await this.client.get('/api/v1/medical/goals', {
      params: { active_only: activeOnly },
    });
    return response.data;
  }

  async createHealthGoal(data: any) {
    const response = await this.client.post('/api/v1/medical/goals', data);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export for direct axios usage if needed
export { API_BASE_URL };
