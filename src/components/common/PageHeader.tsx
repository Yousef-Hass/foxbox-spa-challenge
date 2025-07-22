import React from 'react';
import { Link } from 'react-router-dom';

import '@/styles/components/weather-detail/WeatherDetail.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonPath?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  backButtonText = 'Back to List',
  backButtonPath = '/',
}) => {
  return (
    <div className='page-header'>
      {showBackButton && (
        <Link to={backButtonPath} className='back-btn'>
          ← {backButtonText}
        </Link>
      )}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
