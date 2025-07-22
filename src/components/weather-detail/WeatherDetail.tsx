import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ErrorState, LoadingState, PageHeader } from '@/components/common';
import DetailCard from './DetailCard';
import { fetchWeatherData } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';
import '@/styles/components/weather-detail/WeatherDetail.css';
import { createDetailCards } from '@/constants';

/**
 * WeatherDetail component displays detailed weather information for a specific city
 */
const WeatherDetail: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();

  // Fetch detailed weather data for the specific city
  const {
    data: weatherData,
    isLoading,
    error,
    refetch,
  } = useQuery<WeatherData>({
    queryKey: ['weatherData', cityName],
    queryFn: () => fetchWeatherData(decodeURIComponent(cityName!)),
    enabled: !!cityName, // Only fetch if cityName is available
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes before refetching
  });

  const handleRefresh = () => {
    refetch();
  };

  // Handle case when no city name is provided in URL
  if (!cityName) {
    return (
      <div className='weather-detail'>
        <ErrorState
          title='City name is required'
          message='Please select a city from the list'
          showBackButton
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='weather-detail'>
        <LoadingState title='Loading Weather Details...' showBackButton />
      </div>
    );
  }

  if (error) {
    return (
      <div className='weather-detail'>
        <ErrorState
          title='Error Loading Weather Details'
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load weather data'
          }
          onRetry={handleRefresh}
          showBackButton
        />
      </div>
    );
  }

  // Handle case when API returns no data
  if (!weatherData) {
    return (
      <div className='weather-detail'>
        <ErrorState
          title='No Weather Data Available'
          message='Unable to load weather information for this city'
          showBackButton
        />
      </div>
    );
  }

  // Generate detail cards configuration from weather data
  const detailCards = createDetailCards(weatherData);

  return (
    <div className='weather-detail'>
      <PageHeader
        title={`${weatherData.name}, ${weatherData.sys.country}`}
        showBackButton
      />

      <div className='weather-detail-content'>
        {/* Main weather display with large icon and current conditions */}
        <div className='main-weather card'>
          <div className='weather-icon-large'>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt={weatherData.weather[0].description}
              width='120'
              height='120'
            />
          </div>
          <div className='main-weather-info'>
            <h1>{Math.round(weatherData.main.temp)}°C</h1>
            <p className='description'>{weatherData.weather[0].description}</p>
            <p className='feels-like'>
              Feels like {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
        </div>

        {/* Grid of detail cards showing various weather metrics */}
        <div className='weather-details-grid'>
          {detailCards.map((card, index) => (
            <DetailCard key={index} title={card.title} items={card.items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
