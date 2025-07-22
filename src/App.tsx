import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { WeatherList } from '@/components/weather-list';
import { WeatherDetail } from '@/components/weather-detail';
import '@/styles/App.css';

/**
 * Main application component that handles routing between the weather list
 * and detail views.
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1>Weather App</h1>
          <p>Explore weather data around the world</p>
        </header>
        <main className='container'>
          <Routes>
            {/* Weather list page - shows all popular cities */}
            <Route path='/' element={<WeatherList />} />
            {/* Weather detail page - shows detailed weather for specific city */}
            <Route path='/city/:cityName' element={<WeatherDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
