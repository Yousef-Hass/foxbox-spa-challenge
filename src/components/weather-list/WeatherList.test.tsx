import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import WeatherList from './WeatherList';

import { fetchWeatherList } from '@/services/weatherApi';

// Mock the weather API service
jest.mock('@/services/weatherApi');
const mockFetchWeatherList = fetchWeatherList as jest.MockedFunction<
  typeof fetchWeatherList
>;

/**
 * Test suite for the WeatherList component
 */
describe('WeatherList Component', () => {
  const mockWeatherData = [
    {
      name: 'London',
      country: 'GB',
      temperature: 15,
      description: 'cloudy',
      icon: '04d',
    },
    {
      name: 'New York',
      country: 'US',
      temperature: 22,
      description: 'sunny',
      icon: '01d',
    },
  ];

  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for testing
        },
      },
    });
    jest.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{component}</BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    mockFetchWeatherList.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<WeatherList />);

    expect(
      screen.getByText('Loading weather information...')
    ).toBeInTheDocument();
  });

  test('renders weather list when data loads successfully', async () => {
    mockFetchWeatherList.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherList />);

    await waitFor(() => {
      expect(screen.getByText('Popular Cities')).toBeInTheDocument();
      expect(
        screen.getByText('Click on a city to view detailed weather information')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('cloudy')).toBeInTheDocument();
    expect(screen.getByText('sunny')).toBeInTheDocument();
  });

  test('renders error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch weather data';
    mockFetchWeatherList.mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<WeatherList />);

    await waitFor(() => {
      expect(
        screen.getByText('Error Loading Weather Data')
      ).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });

  test('displays correct number of weather cards', async () => {
    mockFetchWeatherList.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherList />);

    await waitFor(() => {
      const weatherCards = screen.getAllByRole('link');
      expect(weatherCards).toHaveLength(2);
    });
  });

  test('weather cards have correct navigation links', async () => {
    mockFetchWeatherList.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherList />);

    await waitFor(() => {
      const londonLink = screen.getByRole('link', { name: /london/i });
      const newYorkLink = screen.getByRole('link', { name: /new york/i });

      expect(londonLink).toHaveAttribute('href', '/city/London');
      expect(newYorkLink).toHaveAttribute('href', '/city/New%20York');
    });
  });

  test('displays weather information correctly', async () => {
    mockFetchWeatherList.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherList />);

    await waitFor(() => {
      // Check that city names are displayed
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();

      // Check that temperatures are displayed
      expect(screen.getByText('15°C')).toBeInTheDocument();
      expect(screen.getByText('22°C')).toBeInTheDocument();

      // Check that weather descriptions are displayed
      expect(screen.getByText('cloudy')).toBeInTheDocument();
      expect(screen.getByText('sunny')).toBeInTheDocument();
    });
  });

  test('shows no data message when empty array is returned', async () => {
    mockFetchWeatherList.mockResolvedValue([]);

    renderWithProviders(<WeatherList />);

    await waitFor(() => {
      expect(screen.getByText('No weather data available')).toBeInTheDocument();
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });
  });
});
