/**
 * Weather data structure returned by the OpenWeatherMap API
 */
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
}

/**
 * Simplified weather data for list view
 */
export interface WeatherListItem {
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
}

/**
 * API error response structure
 */
export interface ApiError {
  message: string;
  cod?: string;
}
