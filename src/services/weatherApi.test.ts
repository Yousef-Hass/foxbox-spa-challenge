import { fetchWeatherData, fetchWeatherList } from '@/services/weatherApi';

// Mock fetch globally
global.fetch = jest.fn();

/**
 * Test suite for weather API service functions
 */
describe('Weather API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherData', () => {
    const mockWeatherResponse = {
      name: 'London',
      main: {
        temp: 15,
        feels_like: 13,
        humidity: 75,
        pressure: 1013,
        temp_min: 12,
        temp_max: 18,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      wind: {
        speed: 5.2,
        deg: 180,
      },
      sys: {
        country: 'GB',
        sunrise: 1640995200,
        sunset: 1641024000,
      },
      coord: {
        lat: 51.5074,
        lon: -0.1278,
      },
    };

    test('fetches weather data successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      });

      const result = await fetchWeatherData('London');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('weather?q=London&units=metric&appid=')
      );
      expect(result).toEqual(mockWeatherResponse);
    });

    test('throws error when API returns error response', async () => {
      const errorResponse = { message: 'City not found', cod: '404' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => errorResponse,
      });

      await expect(fetchWeatherData('InvalidCity')).rejects.toThrow(
        'City not found'
      );
    });

    test('throws error when network request fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchWeatherData('London')).rejects.toThrow('Network error');
    });
  });

  describe('fetchWeatherList', () => {
    test('fetches weather list successfully using bulk API', async () => {
      const mockBulkResponse = {
        list: [
          {
            name: 'London',
            sys: { country: 'GB' },
            main: { temp: 15 },
            weather: [{ description: 'cloudy', icon: '04d' }],
          },
          {
            name: 'New York',
            sys: { country: 'US' },
            main: { temp: 22 },
            weather: [{ description: 'sunny', icon: '01d' }],
          },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockBulkResponse,
      });

      const result = await fetchWeatherList();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/group?id=2643743,5128581,1850147,2988507,2147714,2950159,524901,1816670,3451190,360630'
        )
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: 'London',
        country: 'GB',
        temperature: 15,
        description: 'cloudy',
        icon: '04d',
      });
      expect(result[1]).toEqual({
        name: 'New York',
        country: 'US',
        temperature: 22,
        description: 'sunny',
        icon: '01d',
      });
    });

    test('handles bulk API errors gracefully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'API limit exceeded' }),
      });

      await expect(fetchWeatherList()).rejects.toThrow('API limit exceeded');
    });
  });
});
