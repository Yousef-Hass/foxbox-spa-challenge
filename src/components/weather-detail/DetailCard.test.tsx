import { render, screen } from '@testing-library/react';
import React from 'react';

import DetailCard from './DetailCard';

// Mock detail card data for testing
const mockDetailCard = {
  title: 'Temperature Range',
  items: [
    { label: 'Min', value: '15°C' },
    { label: 'Max', value: '25°C' },
  ],
};

/**
 * Test suite for the DetailCard component
 */
describe('DetailCard Component', () => {
  test('renders card title correctly', () => {
    render(
      <DetailCard title={mockDetailCard.title} items={mockDetailCard.items} />
    );

    expect(screen.getByText('Temperature Range')).toBeInTheDocument();
  });

  test('renders all detail items correctly', () => {
    render(
      <DetailCard title={mockDetailCard.title} items={mockDetailCard.items} />
    );

    expect(screen.getByText('Min:')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('Max:')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  test('renders multiple items correctly', () => {
    const multipleItems = [
      { label: 'Humidity', value: '65%' },
      { label: 'Pressure', value: '1013 hPa' },
      { label: 'Wind', value: '5 m/s' },
    ];

    render(<DetailCard title='Weather Info' items={multipleItems} />);

    expect(screen.getByText('Humidity:')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('Pressure:')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
    expect(screen.getByText('Wind:')).toBeInTheDocument();
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
  });

  test('renders with empty items array', () => {
    render(<DetailCard title='Empty Card' items={[]} />);

    expect(screen.getByText('Empty Card')).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(
      <DetailCard title={mockDetailCard.title} items={mockDetailCard.items} />
    );

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
