'use client';

import { useState, useEffect } from 'react';
import ChessTimer from './components/ChessTimer';
import TimerSettings from './components/TimerSettings';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [player1Time, setPlayer1Time] = useState(300); // 5 minutes default
  const [player2Time, setPlayer2Time] = useState(300);
  const [player1Increment, setPlayer1Increment] = useState(0);
  const [player2Increment, setPlayer2Increment] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme from localStorage (if available)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('chess-timer-theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Use system preference as default if available
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);
  
  // Update document theme class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    
    // Save theme preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('chess-timer-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);
  
  const handleStartGame = () => {
    setGameInProgress(true);
    setShowTimer(true);
  };
  
  const handleGameEnd = () => {
    setGameInProgress(false);
  };
  
  const handleBackToSettings = () => {
    setGameInProgress(false);
    setShowTimer(false);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <main className="main-container">
      <div className="header">
        <h1 className="title">Chess Timer</h1>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      
      <div className="app-container">
        {!showTimer ? (
          <TimerSettings 
            player1Time={player1Time}
            player2Time={player2Time}
            player1Increment={player1Increment}
            player2Increment={player2Increment}
            onPlayer1TimeChange={setPlayer1Time}
            onPlayer2TimeChange={setPlayer2Time}
            onPlayer1IncrementChange={setPlayer1Increment}
            onPlayer2IncrementChange={setPlayer2Increment}
            onStartGame={handleStartGame}
            gameInProgress={gameInProgress}
          />
        ) : (
          <>
            <ChessTimer 
              player1Time={player1Time}
              player2Time={player2Time}
              player1Increment={player1Increment}
              player2Increment={player2Increment}
              gameInProgress={gameInProgress}
              onGameEnd={handleGameEnd}
            />
            
            <div className="button-container">
              {gameInProgress && (
                <button 
                  className="reset-button"
                  onClick={handleGameEnd}
                >
                  Reset Game
                </button>
              )}
              
              <button 
                className="back-button"
                onClick={handleBackToSettings}
              >
                Back to Settings
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
