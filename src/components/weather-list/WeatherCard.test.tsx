import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import WeatherCard from './WeatherCard';
import { WeatherListItem } from '@/types/weather';

// Mock weather data for testing
const mockWeather: WeatherListItem = {
  name: 'London',
  country: 'GB',
  temperature: 20,
  description: 'Partly cloudy',
  icon: '02d',
};

/**
 * Test suite for the WeatherCard component
 */
describe('WeatherCard Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders city name correctly', () => {
    renderWithRouter(<WeatherCard weather={mockWeather} />);

    expect(screen.getByText('London')).toBeInTheDocument();
  });

  test('renders temperature correctly', () => {
    renderWithRouter(<WeatherCard weather={mockWeather} />);

    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  test('renders weather description correctly', () => {
    renderWithRouter(<WeatherCard weather={mockWeather} />);

    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  });

  test('renders weather icon with correct source', () => {
    renderWithRouter(<WeatherCard weather={mockWeather} />);

    const weatherIcon = screen.getByAltText('Partly cloudy');
    expect(weatherIcon).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/02d@2x.png'
    );
  });

  test('renders as a link to city detail page', () => {
    renderWithRouter(<WeatherCard weather={mockWeather} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/city/London');
  });

  test('has proper accessibility attributes', () => {
    renderWithRouter(<WeatherCard weather={mockWeather} />);

    const weatherIcon = screen.getByAltText('Partly cloudy');
    expect(weatherIcon).toBeInTheDocument();
  });
});
