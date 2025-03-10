import React, { useState, useEffect, useRef } from 'react';

type ChessTimerProps = {
  player1Time: number;
  player2Time: number;
  player1Increment: number;
  player2Increment: number;
  gameInProgress: boolean;
  onGameEnd: () => void;
};

const ChessTimer: React.FC<ChessTimerProps> = ({
  player1Time: initialPlayer1Time,
  player2Time: initialPlayer2Time,
  player1Increment,
  player2Increment,
  gameInProgress,
  onGameEnd,
}) => {
  const [player1Time, setPlayer1Time] = useState(initialPlayer1Time);
  const [player2Time, setPlayer2Time] = useState(initialPlayer2Time);
  const [activePlayer, setActivePlayer] = useState<1 | 2 | null>(null);
  const [player1Moves, setPlayer1Moves] = useState(0);
  const [player2Moves, setPlayer2Moves] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Format seconds into MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Reset timer when game starts
  useEffect(() => {
    if (gameInProgress) {
      setPlayer1Time(initialPlayer1Time);
      setPlayer2Time(initialPlayer2Time);
      setActivePlayer(null);
      setPlayer1Moves(0);
      setPlayer2Moves(0);
      setIsPaused(false);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setActivePlayer(null);
    }
  }, [gameInProgress, initialPlayer1Time, initialPlayer2Time]);
  
  // Handle timer countdown
  useEffect(() => {
    if (gameInProgress && activePlayer && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              onGameEnd();
              return 0;
            }
            return prev - 1;
          });
        } else {
          setPlayer2Time(prev => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              onGameEnd();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activePlayer, gameInProgress, isPaused, onGameEnd]);
  
  const handlePlayerClick = (player: 1 | 2) => {
    if (!gameInProgress || isPaused) return; // Prevent interaction when paused
  
    // If the game was reset and no active player is set, start with the other player's timer
    if (activePlayer === null) {
      setActivePlayer(player === 1 ? 2 : 1); // Start the opponent's timer
      return;
    }
  
    if (player !== activePlayer) return; // Only the active player can click
  
    // Stop the previous timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  
    // Apply increment to the player who just clicked
    if (activePlayer === 1) {
      setPlayer1Time(prev => prev + player1Increment);
      setPlayer1Moves(prev => prev + 1);
    } else {
      setPlayer2Time(prev => prev + player2Increment);
      setPlayer2Moves(prev => prev + 1);
    }
  
    // Switch turn and start the other player's timer
    setActivePlayer(player === 1 ? 2 : 1);
  };

  const handlePauseGame = () => {
    setIsPaused(prev => !prev);
  };

  const handleResetGame = () => {
    setPlayer1Time(initialPlayer1Time);
    setPlayer2Time(initialPlayer2Time);
    setPlayer1Moves(0);
    setPlayer2Moves(0);
    setActivePlayer(null);
    setIsPaused(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="chess-timer">
      <div 
        className={`player-timer ${activePlayer === 2 ? 'active' : ''} ${player2Time === 0 ? 'time-out' : ''}`}
        onClick={() => handlePlayerClick(2)}
      >
        <div className="timer-display">{formatTime(player2Time)}</div>
        <div className="moves-count">Moves: {player2Moves}</div>
      </div>
      
      <div className="timer-controls">
        {activePlayer === null && gameInProgress && (
          <div className="start-prompt">Tap any timer to begin</div>
        )}
      </div>
      
      <div 
        className={`player-timer ${activePlayer === 1 ? 'active' : ''} ${player1Time === 0 ? 'time-out' : ''}`}
        onClick={() => handlePlayerClick(1)}
      >
        <div className="timer-display">{formatTime(player1Time)}</div>
        <div className="moves-count">Moves: {player1Moves}</div>
      </div>
      
      <div className="button-container">
        <button className="pause-button" onClick={handlePauseGame}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button className="reset-button" onClick={handleResetGame}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChessTimer;
