import { formatTime, getWindDirection } from '@/utils/weatherUtils';
import { WeatherData } from '@/types/weather';

export interface DetailCardConfig {
  title: string;
  items: Array<{
    label: string;
    value: string | number;
  }>;
}

/**
 * Creates detail cards configuration based on weather data
 * Transforms raw API data into display-ready format with proper units
 */
export const createDetailCards = (
  weatherData: WeatherData
): DetailCardConfig[] => [
  {
    title: 'Temperature Range',
    items: [
      { label: 'Min', value: `${Math.round(weatherData.main.temp_min)}°C` },
      { label: 'Max', value: `${Math.round(weatherData.main.temp_max)}°C` },
    ],
  },
  {
    title: 'Humidity & Pressure',
    items: [
      { label: 'Humidity', value: `${weatherData.main.humidity}%` },
      { label: 'Pressure', value: `${weatherData.main.pressure} hPa` },
    ],
  },
  {
    title: 'Wind',
    items: [
      { label: 'Speed', value: `${weatherData.wind.speed} m/s` },
      { label: 'Direction', value: getWindDirection(weatherData.wind.deg) },
    ],
  },
  {
    title: 'Sun Times',
    items: [
      { label: 'Sunrise', value: formatTime(weatherData.sys.sunrise) },
      { label: 'Sunset', value: formatTime(weatherData.sys.sunset) },
    ],
  },
  {
    title: 'Location',
    items: [
      { label: 'Latitude', value: `${weatherData.coord.lat}°` },
      { label: 'Longitude', value: `${weatherData.coord.lon}°` },
    ],
  },
  {
    title: 'Visibility & Clouds',
    items: [
      {
        label: 'Visibility',
        value: `${(weatherData.visibility / 1000).toFixed(1)} km`,
      }, // Convert meters to kilometers
      { label: 'Cloud Coverage', value: `${weatherData.clouds.all}%` },
    ],
  },
];
