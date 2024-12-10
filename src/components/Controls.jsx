function Controls({ unit, onUnitToggle, theme, onThemeToggle }) {
  return (
    <div className="settings-container">
      <button onClick={onUnitToggle} className="button">
        °{unit === 'celsius' ? 'C' : 'F'}
      </button>
      <button onClick={onThemeToggle} className="button">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default Controls;