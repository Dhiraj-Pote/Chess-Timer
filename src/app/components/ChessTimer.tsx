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
    } else {
      // Clear interval when game is not in progress
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
    if (!gameInProgress || isPaused) return;
    
    // First click of the game
    if (activePlayer === null) {
      setActivePlayer(player === 1 ? 2 : 1);
      return;
    }
    
    // Can only click your own timer when it's your turn
    if (player !== activePlayer) return;
    
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Add increment to the player who just moved
    if (activePlayer === 1) {
      setPlayer1Time(prev => prev + player1Increment);
      setPlayer1Moves(prev => prev + 1);
    } else {
      setPlayer2Time(prev => prev + player2Increment);
      setPlayer2Moves(prev => prev + 1);
    }
    
    // Switch active player
    setActivePlayer(player === 1 ? 2 : 1);
  };

  const handlePauseGame = () => {
    setIsPaused(prev => !prev);
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
      
      <button className="pause-button" onClick={handlePauseGame}>
        {isPaused ? 'Resume Game' : 'Pause Game'}
      </button>
    </div>
  );
};

export default ChessTimer;
