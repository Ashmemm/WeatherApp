import { formatDate } from '../utils/dateUtils';
import { formatTemperature } from '../utils/temperatureUtils';
import { getWeatherIcon } from '../utils/weatherIcons';

function WeatherCard({ date, maxTemp, minTemp, precipitation, unit }) {
  return (
    <div className="weather-card">
      <div className="weather-date">{formatDate(date)}</div>
      <div className="weather-icon">{getWeatherIcon(precipitation)}</div>
      <div className="temperature">
        High: {formatTemperature(maxTemp, unit)}
      </div>
      <div className="temperature">
        Low: {formatTemperature(minTemp, unit)}
      </div>
      <div className="precipitation">Rain: {precipitation}%</div>
    </div>
  );
}

export default WeatherCard;