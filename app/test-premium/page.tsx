'use client';
import React from 'react';

export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f6f7f6 0%, #f2f1ed 50%, #e7e5df 100%)',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #3b82f6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '2rem'
        }}>
          LISTO
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: '#6f6760',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Your Health & Wellness Companion - Now with Premium Design!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Wellness Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              💚
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2d2923',
              marginBottom: '1rem'
            }}>
              Wellness Hub
            </h3>
            <p style={{
              color: '#6f6760',
              lineHeight: '1.5'
            }}>
              Track your health, mood, and wellness journey with neurodivergent-friendly tools.
            </p>
          </div>

          {/* Medical Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              🧠
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2d2923',
              marginBottom: '1rem'
            }}>
              Medical Hub
            </h3>
            <p style={{
              color: '#6f6760',
              lineHeight: '1.5'
            }}>
              Medical education, disease prevention, and administrative assistance.
            </p>
          </div>

          {/* Vision Board Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2d2923',
              marginBottom: '1rem'
            }}>
              Vision Board
            </h3>
            <p style={{
              color: '#6f6760',
              lineHeight: '1.5'
            }}>
              Visualize and achieve your goals with interactive vision boards.
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '2rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#2d2923',
            marginBottom: '1rem'
          }}>
            Premium Design Features Active ✨
          </h2>
          <ul style={{
            textAlign: 'left',
            color: '#6f6760',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            listStyle: 'none',
            padding: 0
          }}>
            <li>✅ Glassmorphism effects with backdrop-filter</li>
            <li>✅ Premium gradient backgrounds</li>
            <li>✅ Professional typography system</li>
            <li>✅ Advanced CSS custom properties</li>
            <li>✅ Responsive design for all devices</li>
            <li>✅ Neurodivergent-friendly color palette</li>
          </ul>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '2rem',
          fontSize: '1.2rem',
          fontWeight: '600',
          display: 'inline-block',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          🚀 Continue to Full App
        </div>
      </div>
    </div>
  );
}
