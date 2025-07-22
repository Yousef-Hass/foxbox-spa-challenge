import { createDetailCards } from '@/constants/weatherCards';
import { WeatherData } from '@/types/weather';

/**
 * Test suite for weatherCards constants
 */
describe('weatherCards Constants', () => {
  // Mock weather data for testing
  const mockWeatherData: WeatherData = {
    name: 'London',
    coord: { lat: 51.5074, lon: -0.1278 },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    ],
    main: {
      temp: 20,
      feels_like: 18,
      temp_min: 15,
      temp_max: 25,
      pressure: 1013,
      humidity: 65,
    },
    wind: { speed: 5, deg: 180 },
    sys: {
      country: 'GB',
      sunrise: 1640995200, // 2022-01-01 08:00:00 UTC
      sunset: 1641024000, // 2022-01-01 16:00:00 UTC
    },
    visibility: 10000, // 10km in meters
    clouds: { all: 20 },
  };

  describe('createDetailCards', () => {
    test('creates correct number of detail cards', () => {
      const detailCards = createDetailCards(mockWeatherData);

      expect(detailCards).toHaveLength(6);
    });

    test('creates temperature range card correctly', () => {
      const detailCards = createDetailCards(mockWeatherData);
      const tempCard = detailCards.find(
        card => card.title === 'Temperature Range'
      );

      expect(tempCard).toBeDefined();
      expect(tempCard?.items).toHaveLength(2);
      expect(tempCard?.items[0]).toEqual({ label: 'Min', value: '15°C' });
      expect(tempCard?.items[1]).toEqual({ label: 'Max', value: '25°C' });
    });

    test('creates humidity & pressure card correctly', () => {
      const detailCards = createDetailCards(mockWeatherData);
      const humidityCard = detailCards.find(
        card => card.title === 'Humidity & Pressure'
      );

      expect(humidityCard).toBeDefined();
      expect(humidityCard?.items).toHaveLength(2);
      expect(humidityCard?.items[0]).toEqual({
        label: 'Humidity',
        value: '65%',
      });
      expect(humidityCard?.items[1]).toEqual({
        label: 'Pressure',
        value: '1013 hPa',
      });
    });

    test('creates wind card correctly', () => {
      const detailCards = createDetailCards(mockWeatherData);
      const windCard = detailCards.find(card => card.title === 'Wind');

      expect(windCard).toBeDefined();
      expect(windCard?.items).toHaveLength(2);
      expect(windCard?.items[0]).toEqual({ label: 'Speed', value: '5 m/s' });
      expect(windCard?.items[1]).toEqual({ label: 'Direction', value: 'S' }); // 180° = South
    });

    test('creates sun times card correctly', () => {
      const detailCards = createDetailCards(mockWeatherData);
      const sunCard = detailCards.find(card => card.title === 'Sun Times');

      expect(sunCard).toBeDefined();
      expect(sunCard?.items).toHaveLength(2);
      expect(sunCard?.items[0].label).toBe('Sunrise');
      expect(sunCard?.items[1].label).toBe('Sunset');
      // Values will be formatted time strings
      expect(typeof sunCard?.items[0].value).toBe('string');
      expect(typeof sunCard?.items[1].value).toBe('string');
    });

    test('creates location card correctly', () => {
      const detailCards = createDetailCards(mockWeatherData);
      const locationCard = detailCards.find(card => card.title === 'Location');

      expect(locationCard).toBeDefined();
      expect(locationCard?.items).toHaveLength(2);
      expect(locationCard?.items[0]).toEqual({
        label: 'Latitude',
        value: '51.5074°',
      });
      expect(locationCard?.items[1]).toEqual({
        label: 'Longitude',
        value: '-0.1278°',
      });
    });

    test('creates visibility & clouds card correctly', () => {
      const detailCards = createDetailCards(mockWeatherData);
      const visibilityCard = detailCards.find(
        card => card.title === 'Visibility & Clouds'
      );

      expect(visibilityCard).toBeDefined();
      expect(visibilityCard?.items).toHaveLength(2);
      expect(visibilityCard?.items[0]).toEqual({
        label: 'Visibility',
        value: '10.0 km',
      });
      expect(visibilityCard?.items[1]).toEqual({
        label: 'Cloud Coverage',
        value: '20%',
      });
    });

    test('handles visibility conversion correctly', () => {
      const weatherDataWithVisibility = {
        ...mockWeatherData,
        visibility: 5000, // 5km in meters
      };
      const detailCards = createDetailCards(weatherDataWithVisibility);
      const visibilityCard = detailCards.find(
        card => card.title === 'Visibility & Clouds'
      );

      expect(visibilityCard?.items[0]).toEqual({
        label: 'Visibility',
        value: '5.0 km',
      });
    });

    test('handles zero visibility correctly', () => {
      const weatherDataWithZeroVisibility = {
        ...mockWeatherData,
        visibility: 0,
      };
      const detailCards = createDetailCards(weatherDataWithZeroVisibility);
      const visibilityCard = detailCards.find(
        card => card.title === 'Visibility & Clouds'
      );

      expect(visibilityCard?.items[0]).toEqual({
        label: 'Visibility',
        value: '0.0 km',
      });
    });
  });
});
