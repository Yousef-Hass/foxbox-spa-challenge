import React from 'react';
import { render, screen } from '@testing-library/react';

import Loader from './Loader';

describe('Loader Component', () => {
  it('renders with default props', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader-container');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loader-container');
  });

  it('renders with custom size', () => {
    render(<Loader size='large' />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveClass('loader-large');
  });

  it('renders with custom color', () => {
    const customColor = '#ff0000';
    render(<Loader color={customColor} />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toHaveStyle(`border-top-color: ${customColor}`);
  });

  it('renders with custom className', () => {
    const customClass = 'custom-loader';
    render(<Loader className={customClass} />);
    const loader = screen.getByTestId('loader-container');
    expect(loader).toHaveClass('loader-container', customClass);
  });

  it('renders with all custom props', () => {
    const customColor = '#00ff00';
    const customClass = 'test-class';
    render(<Loader size='small' color={customColor} className={customClass} />);
    const loader = screen.getByTestId('loader-container');
    const spinner = screen.getByTestId('loader-spinner');

    expect(loader).toHaveClass('loader-container', customClass);
    expect(spinner).toHaveClass('loader-spinner', 'loader-small');
    expect(spinner).toHaveStyle(`border-top-color: ${customColor}`);
  });
});
