import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LoadingState from './LoadingState';

/**
 * Test suite for the LoadingState component
 */
describe('LoadingState Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders title correctly', () => {
    renderWithRouter(<LoadingState title='Loading Data' />);

    expect(screen.getByText('Loading Data')).toBeInTheDocument();
  });

  test('renders subtitle when provided', () => {
    renderWithRouter(
      <LoadingState
        title='Loading Data'
        subtitle='Please wait while we fetch the data'
      />
    );

    expect(
      screen.getByText('Please wait while we fetch the data')
    ).toBeInTheDocument();
  });

  test('does not render subtitle when not provided', () => {
    renderWithRouter(<LoadingState title='Loading Data' />);

    expect(
      screen.queryByText('Please wait while we fetch the data')
    ).not.toBeInTheDocument();
  });

  test('renders back button when showBackButton is true', () => {
    renderWithRouter(<LoadingState title='Loading Data' showBackButton />);

    const backButton = screen.getByText(/Back to List/);
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });

  test('renders custom back button text when provided', () => {
    renderWithRouter(
      <LoadingState
        title='Loading Data'
        showBackButton
        backButtonText='Go Home'
      />
    );

    expect(screen.getByText(/Go Home/)).toBeInTheDocument();
  });

  test('renders custom back button path when provided', () => {
    renderWithRouter(
      <LoadingState
        title='Loading Data'
        showBackButton
        backButtonPath='/custom'
      />
    );

    const backButton = screen.getByText(/Back to List/);
    expect(backButton).toHaveAttribute('href', '/custom');
  });

  test('does not render back button when showBackButton is false', () => {
    renderWithRouter(<LoadingState title='Loading Data' />);

    expect(screen.queryByText('Back to List')).not.toBeInTheDocument();
  });

  test('renders loader component', () => {
    renderWithRouter(<LoadingState title='Loading Data' />);

    // Check if the loader is rendered (it should have the 'large' size)
    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
    expect(screen.getByTestId('loader-spinner')).toHaveClass('loader-large');
  });
});
