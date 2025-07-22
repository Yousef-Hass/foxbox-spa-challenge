import { kelvinToCelsius, getWindDirection, formatTime } from './weatherUtils';

/**
 * Test suite for weather utility functions
 */
describe('Weather Utils', () => {
  describe('kelvinToCelsius', () => {
    test('converts Kelvin to Celsius correctly', () => {
      expect(kelvinToCelsius(273.15)).toBe(0); // Freezing point
      expect(kelvinToCelsius(293.15)).toBe(20); // Room temperature
      expect(kelvinToCelsius(373.15)).toBe(100); // Boiling point
    });

    test('rounds to nearest integer', () => {
      expect(kelvinToCelsius(273.7)).toBe(1);
      expect(kelvinToCelsius(273.4)).toBe(0);
    });
  });

  describe('getWindDirection', () => {
    test('converts degrees to cardinal directions', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(135)).toBe('SE');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(225)).toBe('SW');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(315)).toBe('NW');
    });

    test('handles edge cases', () => {
      expect(getWindDirection(360)).toBe('N');
      expect(getWindDirection(22.5)).toBe('NE'); // 22.5 / 45 = 0.5, rounded to 1, so NE
      expect(getWindDirection(67.5)).toBe('E'); // 67.5 / 45 = 1.5, rounded to 2, so E
    });
  });

  describe('formatTime', () => {
    test('formats timestamp to readable time', () => {
      // Mock a specific timestamp (2023-01-01 12:00:00 UTC)
      const timestamp = 1672574400;
      const result = formatTime(timestamp);

      // The exact format depends on the user's locale, but it should contain time
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    test('handles different timestamps', () => {
      const morning = 1672570800; // 11:00 AM
      const evening = 1672603200; // 8:00 PM

      expect(formatTime(morning)).toMatch(/\d{1,2}:\d{2}/);
      expect(formatTime(evening)).toMatch(/\d{1,2}:\d{2}/);
    });
  });
});
