/**
 * Environment Configuration
 * Manages environment variables and API configuration for OpenWeather API
 * Validates required environment variables and provides warning if any are missing
 */
export const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const OPENWEATHER_API_BASE_URL =
  'https://api.openweathermap.org/data/2.5';

const isMissing = (value: string | undefined): boolean => {
  return !value;
};

const missingVars = [
  { name: 'VITE_OPENWEATHER_API_KEY', value: OPENWEATHER_API_KEY },
]
  .filter(({ value }) => isMissing(value))
  .map(({ name }) => name);

if (missingVars.length > 0) {
  console.warn('⚠️  Missing environment variables:', missingVars.join(', '));
}
