import React from 'react';
import { Link } from 'react-router-dom';

import '@/styles/components/common/ErrorState.css';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonPath?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  showBackButton = false,
  backButtonText = 'Back to List',
  backButtonPath = '/',
}) => {
  return (
    <div className='error'>
      <h3>{title}</h3>
      <p>{message}</p>
      <div className='error-actions'>
        {onRetry && (
          <button className='btn' onClick={onRetry}>
            Try Again
          </button>
        )}
        {showBackButton && (
          <Link to={backButtonPath} className='btn'>
            {backButtonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
