import './style.css';
import { getWeatherData, getLocationCoordinates } from './src/api/weatherApi';
import { formatDate } from './src/utils/dateUtils';
import { formatTemperature } from './src/utils/temperatureUtils';
import { getWeatherIcon } from './src/utils/weatherIcons';
import { initTheme, toggleTheme } from './src/utils/themeUtils';

const cityInput = document.querySelector('#cityInput');
const searchButton = document.querySelector('#searchButton');
const unitToggleButton = document.querySelector('#unitToggle');
const themeToggleButton = document.querySelector('#themeToggle');
const weatherContainer = document.querySelector('#weatherContainer');
const errorMessage = document.querySelector('#errorMessage');

let currentUnit = localStorage.getItem('temperatureUnit') || 'celsius';
let currentTheme = initTheme();

async function searchWeather() {
  try {
    errorMessage.textContent = '';
    const cityName = cityInput.value.trim();
    
    if (!cityName) {
      throw new Error('Please enter a city name');
    }

    const location = await getLocationCoordinates(cityName);
    
    if (!location) {
      throw new Error('City not found');
    }

    const weatherData = await getWeatherData(location.latitude, location.longitude);
    displayWeather(weatherData);
  } catch (error) {
    errorMessage.textContent = error.message;
    weatherContainer.innerHTML = '';
  }
}

function displayWeather(data) {
  weatherContainer.innerHTML = '';
  
  data.daily.time.forEach((date, index) => {
    const card = document.createElement('div');
    card.className = 'weather-card';
    
    const icon = getWeatherIcon(data.daily.precipitation_probability_max[index]);
    
    card.innerHTML = `
      <div class="weather-date">${formatDate(date)}</div>
      <div class="weather-icon">${icon}</div>
      <div class="temperature">High: ${formatTemperature(data.daily.temperature_2m_max[index], currentUnit)}</div>
      <div class="temperature">Low: ${formatTemperature(data.daily.temperature_2m_min[index], currentUnit)}</div>
      <div class="precipitation">Rain: ${data.daily.precipitation_probability_max[index]}%</div>
    `;
    
    weatherContainer.appendChild(card);
  });
}

function toggleTemperatureUnit() {
  currentUnit = currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';
  localStorage.setItem('temperatureUnit', currentUnit);
  
  // Refresh the display if we have weather data
  if (weatherContainer.children.length > 0) {
    searchWeather();
  }
}

searchButton.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchWeather();
  }
});

unitToggleButton.addEventListener('click', toggleTemperatureUnit);
themeToggleButton.addEventListener('click', () => {
  currentTheme = toggleTheme(currentTheme);
});