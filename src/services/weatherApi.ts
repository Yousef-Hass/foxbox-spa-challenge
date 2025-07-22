import { OPENWEATHER_API_KEY, OPENWEATHER_API_BASE_URL } from '@/config/env';
import { CITY_IDS } from '@/data/cities';
import { WeatherData, WeatherListItem, ApiError } from '@/types/weather';

// Fetches weather data for a specific city
export const fetchWeatherData = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_API_BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fetches weather data for multiple cities using group API
export const fetchWeatherList = async (): Promise<WeatherListItem[]> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_API_BASE_URL}/group?id=${CITY_IDS.join(',')}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather list');
    }

    const data: { list: WeatherData[] } = await response.json();

    return data.list.map(city => ({
      name: city.name,
      country: city.sys.country,
      temperature: Math.round(city.main.temp),
      description: city.weather[0].description,
      icon: city.weather[0].icon,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather list');
  }
};
