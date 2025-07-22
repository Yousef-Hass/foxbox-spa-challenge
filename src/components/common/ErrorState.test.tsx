import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ErrorState from './ErrorState';

/**
 * Test suite for the ErrorState component
 */
describe('ErrorState Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders error title and message correctly', () => {
    renderWithRouter(
      <ErrorState title='Test Error' message='This is a test error message' />
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test error message')
    ).toBeInTheDocument();
  });

  test('renders retry button when onRetry is provided', () => {
    const mockRetry = jest.fn();
    renderWithRouter(
      <ErrorState
        title='Test Error'
        message='Test message'
        onRetry={mockRetry}
      />
    );

    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  test('does not render retry button when onRetry is not provided', () => {
    renderWithRouter(<ErrorState title='Test Error' message='Test message' />);

    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  test('renders back button when showBackButton is true', () => {
    renderWithRouter(
      <ErrorState title='Test Error' message='Test message' showBackButton />
    );

    const backButton = screen.getByText('Back to List');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });

  test('renders custom back button text when provided', () => {
    renderWithRouter(
      <ErrorState
        title='Test Error'
        message='Test message'
        showBackButton
        backButtonText='Go Home'
      />
    );

    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  test('renders custom back button path when provided', () => {
    renderWithRouter(
      <ErrorState
        title='Test Error'
        message='Test message'
        showBackButton
        backButtonPath='/custom'
      />
    );

    const backButton = screen.getByText('Back to List');
    expect(backButton).toHaveAttribute('href', '/custom');
  });

  test('renders both retry and back buttons when both are provided', () => {
    const mockRetry = jest.fn();
    renderWithRouter(
      <ErrorState
        title='Test Error'
        message='Test message'
        onRetry={mockRetry}
        showBackButton
      />
    );

    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Back to List')).toBeInTheDocument();
  });
});
