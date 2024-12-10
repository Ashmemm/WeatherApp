import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Controls from './components/Controls';
import { getWeatherData, getLocationCoordinates } from './api/weatherApi';
import { useTheme } from './hooks/useTheme';
import './styles/App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState(() => localStorage.getItem('temperatureUnit') || 'celsius');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = async (cityName) => {
    try {
      setError('');
      if (!cityName.trim()) {
        throw new Error('Please enter a city name');
      }

      const location = await getLocationCoordinates(cityName);
      if (!location) {
        throw new Error('City not found');
      }

      const data = await getWeatherData(location.latitude, location.longitude);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    localStorage.setItem('temperatureUnit', newUnit);
  };

  return (
    <div className="container">
      <div className="controls-container">
        <SearchBar onSearch={handleSearch} />
        <Controls 
          unit={unit} 
          onUnitToggle={toggleUnit}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {weatherData && (
        <div className="weather-container">
          {weatherData.daily.time.map((date, index) => (
            <WeatherCard
              key={date}
              date={date}
              maxTemp={weatherData.daily.temperature_2m_max[index]}
              minTemp={weatherData.daily.temperature_2m_min[index]}
              precipitation={weatherData.daily.precipitation_probability_max[index]}
              unit={unit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;