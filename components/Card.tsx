import React from 'react';
import '../styles/design-system.css';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => (
  <div className="card glass animate-entrance" style={style}>
    {children}
  </div>
);

export default Card;
