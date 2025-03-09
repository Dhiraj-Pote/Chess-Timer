import React from 'react';

type ThemeToggleProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button 
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-track">
        <div className="toggle-indicator">
          <span className="toggle-icon">
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
      <span className="toggle-label">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle; 