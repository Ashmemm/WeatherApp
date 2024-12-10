import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
        placeholder="Enter city name"
      />
      <button type="submit" className="button">Search</button>
    </form>
  );
}

export default SearchBar;