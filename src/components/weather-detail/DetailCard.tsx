import React from 'react';

interface DetailItem {
  label: string;
  value: string | number;
}

interface DetailCardProps {
  title: string;
  items: DetailItem[];
}

/**
 * Reusable component for displaying detailed information in a card format with label-value pairs
 */
const DetailCard: React.FC<DetailCardProps> = ({ title, items }) => {
  return (
    <div className='detail-card card'>
      <h3>{title}</h3>
      <div className='detail-content'>
        {items.map((item, index) => (
          <div key={index} className='detail-item'>
            <span className='label'>{item.label}:</span>
            <span className='value'>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCard;
