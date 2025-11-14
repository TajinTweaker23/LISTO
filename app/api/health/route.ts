/**
 * Health Check API Endpoint
 * 
 * This endpoint provides system health status and is used for:
 * - Load balancer health checks
 * - Deployment verification
 * - Monitoring and alerting
 * - Uptime monitoring services
 * 
 * Returns: JSON with health status, version, and system metrics
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Disable caching for health checks

interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  version: string;
  uptime: number;
  environment: string;
  checks: {
    database?: 'ok' | 'error';
    memory?: 'ok' | 'warning' | 'error';
    [key: string]: string | undefined;
  };
  metadata?: {
    nodeVersion: string;
    platform: string;
    memoryUsage?: {
      heapUsed: number;
      heapTotal: number;
      external: number;
      rss: number;
    };
  };
}

export async function GET() {
  try {
    const startTime = Date.now();
    
    // Basic health status
    const health: HealthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      checks: {},
      metadata: {
        nodeVersion: process.version,
        platform: process.platform,
      },
    };

    // Check memory usage
    if (typeof process.memoryUsage === 'function') {
      const memUsage = process.memoryUsage();
      health.metadata!.memoryUsage = {
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
        external: Math.round(memUsage.external / 1024 / 1024), // MB
        rss: Math.round(memUsage.rss / 1024 / 1024), // MB
      };

      // Memory health check (warning if heap used > 80% of heap total)
      const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      if (heapUsagePercent > 90) {
        health.checks.memory = 'error';
        health.status = 'degraded';
      } else if (heapUsagePercent > 80) {
        health.checks.memory = 'warning';
      } else {
        health.checks.memory = 'ok';
      }
    }

    // Database health check (basic - can be expanded)
    // This is a placeholder - add actual database connectivity check
    try {
      // TODO: Add Firebase connectivity check if needed
      // const firebaseOk = await checkFirebaseConnection();
      health.checks.database = 'ok';
    } catch (error) {
      health.checks.database = 'error';
      health.status = 'degraded';
    }

    // Response time check
    const responseTime = Date.now() - startTime;
    if (responseTime > 1000) {
      // If health check takes > 1s, something might be wrong
      health.status = 'degraded';
    }

    // Return appropriate status code
    const statusCode = health.status === 'ok' ? 200 : health.status === 'degraded' ? 503 : 500;

    return NextResponse.json(health, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Response-Time': `${responseTime}ms`,
      },
    });

  } catch (error) {
    // If health check itself fails, return error status
    const errorHealth: HealthStatus = {
      status: 'error',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: 0,
      environment: process.env.NODE_ENV || 'development',
      checks: {
        system: 'error',
      },
      metadata: {
        nodeVersion: process.version,
        platform: process.platform,
      },
    };

    return NextResponse.json(errorHealth, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}

// Support HEAD requests for simple health checks
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
