import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

// Mock the child components to isolate App component testing
jest.mock('@/components/weather-list', () => ({
  WeatherList: function MockWeatherList() {
    return <div data-testid='weather-list'>Weather List Component</div>;
  },
}));

jest.mock('@/components/weather-detail', () => ({
  WeatherDetail: function MockWeatherDetail() {
    return <div data-testid='weather-detail'>Weather Detail Component</div>;
  },
}));

/**
 * Test suite for the main App component
 */
describe('App Component', () => {
  test('renders app header with title and description', () => {
    render(<App />);

    expect(screen.getByText('Weather App')).toBeInTheDocument();
    expect(
      screen.getByText('Explore weather data around the world')
    ).toBeInTheDocument();
  });

  test('renders weather list component on home route', () => {
    render(<App />);

    expect(screen.getByTestId('weather-list')).toBeInTheDocument();
  });

  test('app has proper semantic structure', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
  });
});
