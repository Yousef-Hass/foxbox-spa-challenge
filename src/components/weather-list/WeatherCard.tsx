import React from 'react';
import { Link } from 'react-router-dom';

import { WeatherListItem } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherListItem;
}

/**
 * Reusable component for displaying weather information in a card format
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <Link
      to={`/city/${encodeURIComponent(weather.name)}`}
      className='weather-card-link'
    >
      <div className='weather-card'>
        <div className='weather-card-content'>
          <div className='weather-icon'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width='60'
              height='60'
            />
          </div>
          <div className='weather-info'>
            <h3>{weather.name}</h3>
            <div className='temperature'>
              {Math.round(weather.temperature)}°C
            </div>
            <div className='description'>{weather.description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WeatherCard;
