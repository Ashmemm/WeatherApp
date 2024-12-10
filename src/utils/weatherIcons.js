export const weatherIcons = {
  clear: '☀️',
  partlyCloudy: '⛅',
  cloudy: '☁️',
  rain: '🌧️',
  snow: '🌨️',
  default: '🌡️'
};

export function getWeatherIcon(precipitation) {
  if (precipitation >= 70) return weatherIcons.rain;
  if (precipitation >= 30) return weatherIcons.partlyCloudy;
  return weatherIcons.clear;
}