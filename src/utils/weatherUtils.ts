/**
 * Weather utility functions
 * Helper functions for weather data processing and formatting
 */

/**
 * Converts temperature from Kelvin to Celsius
 * @param kelvin - Temperature in Kelvin
 * @returns Temperature in Celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Converts wind direction from degrees to cardinal direction
 * @param degrees - Wind direction in degrees
 * @returns Cardinal direction string
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Formats timestamp to readable time
 * @param timestamp - Unix timestamp
 * @returns Formatted time string
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
