export function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

export function formatTemperature(temp, unit) {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(temp) : temp;
  return `${Math.round(value)}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}