import React from 'react';

import Loader from './Loader';
import '@/styles/components/common/LoadingState.css';

interface LoadingStateProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonPath?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  title,
  subtitle,
  showBackButton = false,
  backButtonText = 'Back to List',
  backButtonPath = '/',
}) => {
  return (
    <>
      {showBackButton && (
        <div className='loading-header'>
          <a href={backButtonPath} className='back-btn'>
            ← {backButtonText}
          </a>
        </div>
      )}
      <div className='loading-content'>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <Loader size='large' />
      </div>
    </>
  );
};

export default LoadingState;
