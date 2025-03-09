import React from 'react';

type TimerSettingsProps = {
  player1Time: number;
  player2Time: number;
  player1Increment: number;
  player2Increment: number;
  onPlayer1TimeChange: (time: number) => void;
  onPlayer2TimeChange: (time: number) => void;
  onPlayer1IncrementChange: (increment: number) => void;
  onPlayer2IncrementChange: (increment: number) => void;
  onStartGame: () => void;
  gameInProgress: boolean;
};

const TimerSettings: React.FC<TimerSettingsProps> = ({
  player1Time,
  player2Time,
  player1Increment,
  player2Increment,
  onPlayer1TimeChange,
  onPlayer2TimeChange,
  onPlayer1IncrementChange,
  onPlayer2IncrementChange,
  onStartGame,
  gameInProgress
}) => {
  const timeOptions = [
    { label: '1 min', value: 60 },
    { label: '3 min', value: 180 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
  ];

  const incrementOptions = [
    { label: '0s', value: 0 },
    { label: '1s', value: 1 },
    { label: '2s', value: 2 },
    { label: '3s', value: 3 },
    { label: '5s', value: 5 },
    { label: '10s', value: 10 },
  ];

  return (
    <div className="settings-panel">
      <h2>Timer Settings</h2>
      
      <div className="settings-group">
        <label>
          Player 1 Time:
          <select 
            value={player1Time} 
            onChange={(e) => onPlayer1TimeChange(Number(e.target.value))}
            disabled={gameInProgress}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div className="settings-group">
        <label>
          Player 1 Increment:
          <select 
            value={player1Increment} 
            onChange={(e) => onPlayer1IncrementChange(Number(e.target.value))}
            disabled={gameInProgress}
          >
            {incrementOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div className="settings-group">
        <label>
          Player 2 Time:
          <select 
            value={player2Time} 
            onChange={(e) => onPlayer2TimeChange(Number(e.target.value))}
            disabled={gameInProgress}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <div className="settings-group">
        <label>
          Player 2 Increment:
          <select 
            value={player2Increment} 
            onChange={(e) => onPlayer2IncrementChange(Number(e.target.value))}
            disabled={gameInProgress}
          >
            {incrementOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      <button 
        className="start-button" 
        onClick={onStartGame}
        disabled={gameInProgress}
      >
        Start Game
      </button>
    </div>
  );
};

export default TimerSettings;
