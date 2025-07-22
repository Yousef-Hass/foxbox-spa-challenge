import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import WeatherDetail from './WeatherDetail';
import { WeatherData } from '@/types/weather';
import { fetchWeatherData } from '@/services/weatherApi';

// Mock the API service
jest.mock('@/services/weatherApi', () => ({
  fetchWeatherData: jest.fn(),
}));

// Mock the constants
jest.mock('@/constants', () => ({
  createDetailCards: jest.fn(() => [
    {
      title: 'Temperature Range',
      items: [
        { label: 'Min', value: '15°C' },
        { label: 'Max', value: '25°C' },
      ],
    },
  ]),
}));

// Mock the common components
jest.mock('@/components/common', () => ({
  ErrorState: ({ title, message, onRetry, showBackButton }: any) => (
    <div data-testid='error-state'>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try Again</button>}
      {showBackButton && <a href='/'>Back to List</a>}
    </div>
  ),
  LoadingState: ({ title, showBackButton }: any) => (
    <div data-testid='loading-state'>
      <h2>{title}</h2>
      {showBackButton && <a href='/'>Back to List</a>}
    </div>
  ),
  PageHeader: ({ title, showBackButton }: any) => (
    <div data-testid='page-header'>
      <h2>{title}</h2>
      {showBackButton && <a href='/'>Back to List</a>}
    </div>
  ),
}));

// Mock the DetailCard component
jest.mock('./DetailCard', () => ({
  __esModule: true,
  default: ({ title, items }: any) => (
    <div data-testid='detail-card'>
      <h3>{title}</h3>
      {items.map((item: any, index: number) => (
        <div key={index}>
          <span>{item.label}:</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  ),
}));

/**
 * Test suite for the WeatherDetail component
 */
describe('WeatherDetail Component', () => {
  let queryClient: QueryClient;
  const mockFetchWeatherData = jest.mocked(fetchWeatherData);

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

  const renderWithProviders = (
    component: React.ReactElement,
    initialEntries = ['/city/London']
  ) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path='/city/:cityName' element={component} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

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
      sunrise: 1640995200,
      sunset: 1641024000,
    },
    visibility: 10000,
    clouds: { all: 20 },
  };

  test('renders loading state initially', () => {
    mockFetchWeatherData.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<WeatherDetail />);

    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    expect(screen.getByText('Loading Weather Details...')).toBeInTheDocument();
  });

  test('renders error state when no city name is provided', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <WeatherDetail />
      </QueryClientProvider>
    );
    expect(screen.getByText('City name is required')).toBeInTheDocument();
    expect(
      screen.getByText('Please select a city from the list')
    ).toBeInTheDocument();
  });

  test('renders error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch weather data';
    mockFetchWeatherData.mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<WeatherDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Error Loading Weather Details')
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders weather details when API call succeeds', async () => {
    mockFetchWeatherData.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
    });

    expect(screen.getByText('London, GB')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('Feels like 18°C')).toBeInTheDocument();
  });

  test('renders detail cards when weather data is available', async () => {
    mockFetchWeatherData.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('detail-card')).toBeInTheDocument();
    });

    expect(screen.getByText('Temperature Range')).toBeInTheDocument();
    expect(screen.getByText('Min:')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('Max:')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  test('renders weather icon with correct source', async () => {
    mockFetchWeatherData.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherDetail />);

    await waitFor(() => {
      const weatherIcon = screen.getByAltText('clear sky');
      expect(weatherIcon).toHaveAttribute(
        'src',
        'https://openweathermap.org/img/wn/01d@4x.png'
      );
    });
  });

  test('handles retry functionality', async () => {
    const errorMessage = 'Network error';
    mockFetchWeatherData.mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<WeatherDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument();
    });

    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();

    // Mock successful response for retry
    mockFetchWeatherData.mockResolvedValue(mockWeatherData);

    retryButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
    });
  });

  test('handles URL encoded city names', async () => {
    mockFetchWeatherData.mockResolvedValue(mockWeatherData);

    renderWithProviders(<WeatherDetail />, ['/city/New%20York']);

    await waitFor(() => {
      expect(mockFetchWeatherData).toHaveBeenCalledWith('New York');
    });
  });

  test('renders error state when no weather data is returned', async () => {
    mockFetchWeatherData.mockResolvedValue(null as any);

    renderWithProviders(<WeatherDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument();
    });

    expect(screen.getByText('No Weather Data Available')).toBeInTheDocument();
    expect(
      screen.getByText('Unable to load weather information for this city')
    ).toBeInTheDocument();
  });
});
