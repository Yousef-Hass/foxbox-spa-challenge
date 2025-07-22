import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { ErrorState, LoadingState, PageHeader } from '@/components/common';
import WeatherCard from './WeatherCard';
import { fetchWeatherList } from '@/services/weatherApi';
import { WeatherListItem } from '@/types/weather';
import '@/styles/components/weather-list/WeatherList.css';

/**
 * WeatherList component displays a list of popular cities with their current weather
 */
const WeatherList: React.FC = () => {
  // Fetch weather data for all popular cities with caching and retry logic
  const {
    data: weatherList = [],
    isLoading,
    error,
    refetch,
  } = useQuery<WeatherListItem[]>({
    queryKey: ['weatherList'],
    queryFn: fetchWeatherList,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes before refetching
  });

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className='weather-list'>
        <LoadingState
          title='Popular Cities'
          subtitle='Loading weather information...'
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className='weather-list'>
        <ErrorState
          title='Error Loading Weather Data'
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load weather data'
          }
          onRetry={handleRefresh}
        />
      </div>
    );
  }

  return (
    <div className='weather-list'>
      <PageHeader
        title='Popular Cities'
        subtitle='Click on a city to view detailed weather information'
      />

      <div className='weather-grid'>
        {weatherList.map(city => (
          <WeatherCard key={`${city.name}-${city.country}`} weather={city} />
        ))}
      </div>

      {/* Show empty state if no weather data is available */}
      {weatherList.length === 0 && (
        <div className='no-data'>
          <p>No weather data available</p>
          <button className='btn' onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherList;
