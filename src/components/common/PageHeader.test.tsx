import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PageHeader from './PageHeader';

/**
 * Test suite for the PageHeader component
 */
describe('PageHeader Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders title correctly', () => {
    renderWithRouter(<PageHeader title='Test Page' />);

    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  test('renders subtitle when provided', () => {
    renderWithRouter(
      <PageHeader title='Test Page' subtitle='This is a test subtitle' />
    );

    expect(screen.getByText('This is a test subtitle')).toBeInTheDocument();
  });

  test('does not render subtitle when not provided', () => {
    renderWithRouter(<PageHeader title='Test Page' />);

    expect(
      screen.queryByText('This is a test subtitle')
    ).not.toBeInTheDocument();
  });

  test('renders back button when showBackButton is true', () => {
    renderWithRouter(<PageHeader title='Test Page' showBackButton />);

    const backButton = screen.getByText(/Back to List/);
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });

  test('renders custom back button text when provided', () => {
    renderWithRouter(
      <PageHeader title='Test Page' showBackButton backButtonText='Go Home' />
    );

    expect(screen.getByText(/Go Home/)).toBeInTheDocument();
  });

  test('renders custom back button path when provided', () => {
    renderWithRouter(
      <PageHeader title='Test Page' showBackButton backButtonPath='/custom' />
    );

    const backButton = screen.getByText(/Back to List/);
    expect(backButton).toHaveAttribute('href', '/custom');
  });

  test('does not render back button when showBackButton is false', () => {
    renderWithRouter(<PageHeader title='Test Page' />);

    expect(screen.queryByText('Back to List')).not.toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    renderWithRouter(<PageHeader title='Test Page' />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('renders both title and subtitle with back button', () => {
    renderWithRouter(
      <PageHeader title='Test Page' subtitle='Test subtitle' showBackButton />
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
    expect(screen.getByText(/Back to List/)).toBeInTheDocument();
  });
});
