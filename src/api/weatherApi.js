export async function getWeatherData(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto`
  );
  return response.json();
}

export async function getLocationCoordinates(cityName) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
  );
  const data = await response.json();
  return data.results?.[0];
}