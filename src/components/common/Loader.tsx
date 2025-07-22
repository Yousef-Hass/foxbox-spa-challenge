import React from 'react';
import '@/styles/components/common/Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = '#ffffff',
  className = '',
}) => {
  return (
    <div
      data-testid='loader-container'
      className={`loader-container ${className}`}
    >
      <div
        data-testid='loader-spinner'
        className={`loader-spinner loader-${size}`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default Loader;
