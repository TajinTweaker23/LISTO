// lib/security.ts
import { NextApiRequest, NextApiResponse } from 'next';
// import rateLimit from 'express-rate-limit';
// import slowDown from 'express-slow-down';

// Simple rate limiting implementation
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
export const rateLimiter = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;
  
  const now = Date.now();
  const clientData = requestCounts.get(ip as string) || { count: 0, resetTime: now + windowMs };
  
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count++;
  }
  
  requestCounts.set(ip as string, clientData);
  
  if (clientData.count > maxRequests) {
    res.status(429).json({ error: 'Too many requests from this IP, please try again later.' });
    return;
  }
  
  next();
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .trim()
    .slice(0, 1000); // Limit length
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const isStrongPassword = (password: string): { isValid: boolean; requirements: string[] } => {
  const requirements: string[] = [];
  
  if (password.length < 8) {
    requirements.push('At least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    requirements.push('At least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    requirements.push('At least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    requirements.push('At least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    requirements.push('At least one special character');
  }
  
  return {
    isValid: requirements.length === 0,
    requirements
  };
};

// CSRF Protection
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// API endpoint protection
export const protectAPI = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Apply rate limiting
    try {
      await new Promise<void>((resolve, reject) => {
        rateLimiter(req, res, () => resolve());
      });
    } catch (error) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return handler(req, res);
  };
};

// Encryption utilities for sensitive data
export const encryptSensitiveData = (data: string): string => {
  // In production, use proper encryption libraries like crypto-js
  return btoa(data); // Basic encoding for demo
};

export const decryptSensitiveData = (encryptedData: string): string => {
  try {
    return atob(encryptedData);
  } catch {
    return '';
  }
};

// User data protection
export const sanitizeUserData = (userData: any) => {
  const sanitized = { ...userData };
  
  // Remove sensitive fields from client responses
  delete sanitized.password;
  delete sanitized.paymentInfo;
  delete sanitized.ssn;
  delete sanitized.creditCard;
  
  return sanitized;
};

export default {
  rateLimiter,
  sanitizeInput,
  isValidEmail,
  isStrongPassword,
  generateCSRFToken,
  protectAPI,
  encryptSensitiveData,
  decryptSensitiveData,
  sanitizeUserData
};
