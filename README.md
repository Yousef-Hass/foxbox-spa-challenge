# Weather App - Foxbox SPA Challenge

A modern, responsive single-page web application that displays weather information for popular cities around the world. Built with React, TypeScript, and modern web technologies.

## Features

- **List View**: Displays weather information for 10 popular cities in a responsive grid layout
- **Detail View**: Comprehensive weather details including temperature, humidity, wind, and sun times
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds with glassmorphism effects
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Smooth loading animations and feedback
- **TypeScript**: Full type safety throughout the application
- **Comprehensive Testing**: 85+ test cases covering components, services, and edge cases

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **React Router** - Client-side routing for SPA functionality
- **React Query** - Data fetching, caching, and state management
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Jest & Testing Library** - Comprehensive test coverage
- **OpenWeatherMap API** - Free weather data API

## Getting Started

### Prerequisites

- Node.js (version 20.19.4 or higher)
- npm (version 10.8.2 or higher)
- nvm (Node Version Manager) - recommended for version management

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd foxbox-spa-challenge
```

2. Use the correct Node.js version:

```bash
nvm use
```

If the version is not installed, nvm will automatically install it:

```bash
nvm install
nvm use
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`.

### API Configuration

This application uses the OpenWeatherMap API. To set up the API key:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Add your API key to the `.env` file:

```bash
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

**Note**: The `.env` file is already in `.gitignore` to keep your API key secure. Never commit your actual API key to version control.

## Available Scripts

- `npm run dev` - Runs the app in development mode with Vite
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm test` - Launches the test runner in interactive mode
- `npm run test:watch` - Runs tests in watch mode for development

## Project Structure

```
src/
├── components/              # React components
│   ├── common/              # Shared components
│   │   ├── ErrorState.tsx   # Error display component
│   │   ├── LoadingState.tsx # Loading display component
│   │   ├── PageHeader.tsx   # Page header component
│   │   └── Loader.tsx       # Loading spinner component
│   ├── weather-list/        # Weather list components
│   │   ├── WeatherList.tsx  # Main list view component
│   │   ├── WeatherCard.tsx  # Individual weather card
│   │   └── WeatherList.css  # List view styles
│   └── weather-detail/      # Weather detail components
│       ├── WeatherDetail.tsx # Detail view component
│       ├── DetailCard.tsx   # Detail information card
│       └── WeatherDetail.css # Detail view styles
├── services/                # API and utility services
│   ├── weatherApi.ts        # Weather API integration
│   └── weatherApi.test.ts   # API service tests
├── types/                   # TypeScript type definitions
│   └── weather.ts           # Weather data interfaces
├── utils/                   # Utility functions
│   └── weatherUtils.ts      # Weather data processing utilities
├── constants/               # Application constants
│   └── weatherCards.ts      # Detail card configurations
├── data/                    # Static data
│   └── cities.ts            # Popular cities list
├── styles/                  # Global styles
│   ├── index.css            # Global styles
│   ├── App.css              # App-specific styles
│   └── components/          # Component-specific styles
├── config/                  # Configuration files
│   └── env.ts               # Environment variables
├── App.tsx                  # Main application component
├── App.test.tsx             # App component tests
├── index.tsx                # Application entry point
└── setupTests.ts            # Test configuration
```

## Testing

The application includes comprehensive tests covering:

- **Component Testing**: All components have full test coverage
- **Service Testing**: API integration and utility functions
- **Error Handling**: Network failures and edge cases
- **User Interactions**: Click events, navigation, and form interactions
- **Accessibility**: Semantic HTML and proper ARIA attributes

### Test Structure

- **85+ test cases** covering all major functionality
- **Mock implementations** for external dependencies
- **Error scenario testing** for robust error handling
- **Component integration testing** for proper data flow

Run tests with:

```bash
npm test
```

## Browser Support

The application is tested and optimized for:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Design Decisions

### Architecture

- **Component-based structure**: Modular, reusable components with clear separation of concerns
- **Service layer**: Separated API logic from UI components for better maintainability
- **Type safety**: Full TypeScript implementation for better development experience
- **React Query**: Efficient data fetching, caching, and state management

### UI/UX

- **Glassmorphism design**: Modern, translucent card effects with backdrop blur
- **Responsive grid**: Adaptive layout that works seamlessly on all screen sizes
- **Smooth animations**: Hover effects and transitions for enhanced user experience
- **Accessibility**: Semantic HTML, proper ARIA attributes, and keyboard navigation

### Performance

- **Data caching**: React Query provides intelligent caching and background updates
- **Optimized images**: Weather icons from OpenWeatherMap CDN
- **Error handling**: Graceful error handling with user-friendly messages

## API Integration

The application integrates with the OpenWeatherMap API to fetch:

- Current weather conditions with detailed descriptions
- Temperature, humidity, and pressure data
- Wind speed and direction with cardinal directions
- Sunrise and sunset times in local format
- Geographic coordinates and visibility data

### Data Processing

- **Wind direction**: Degrees to cardinal direction mapping
- **Time formatting**: Unix timestamps to readable time format
- **Unit formatting**: Proper units for all weather metrics

## Key Features Implemented

### Weather List Screen

- Grid layout of popular cities with current weather
- Weather icons and descriptions from OpenWeatherMap
- Temperature display with proper formatting
- Clickable cards for navigation to detail view
- Responsive design for all screen sizes

### Weather Detail Screen

- Comprehensive weather information display
- Multiple detail cards for different weather metrics
- Temperature range, humidity, pressure data
- Wind information with direction indicators
- Sunrise/sunset times and geographic coordinates
- Back navigation to list view

### Error Handling

- Network error recovery with retry functionality
- User-friendly error messages
- Graceful fallbacks for missing data
- Loading states during data fetching

## Future Enhancements

Potential improvements for a production application:

- Weather forecasts (5-day, hourly)
- Location-based weather using geolocation
- Weather alerts and notifications
- Dark/light theme toggle
- Unit conversion (Celsius/Fahrenheit)
- Offline support with service workers
- Weather maps integration
- Search functionality for additional cities

## Contributing

This is a challenge submission, but the code follows best practices for maintainability and extensibility.

## License

This project is created for the Foxbox SPA Challenge and is not intended for commercial use.

---

**Note**: This application demonstrates modern React development practices, TypeScript usage, comprehensive testing, responsive design principles, and efficient data management as requested in the challenge requirements.
