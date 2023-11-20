import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './gameStyling.css'

interface Game {
  appid: number;
  name: string;
}

const GameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async (event: FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!inputValue.trim()) {
      setGames([]);
      return;
    }

    try {
      const response = await axios.get(`/api/steam?searchTerm=${encodeURIComponent(inputValue)}`);
      setGames(response.data.applist.apps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const startSteamGame = (appid: number) => {
    window.open(`steam://rungameid/${appid}`, '_blank');
  };

  const openGameUrl = (appid: number) => {
    window.open(`https://store.steampowered.com/app/${appid}`, '_blank');
  };

  return (
    <div className="game-search-container">
      <form onSubmit={fetchGames}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="game-search-input"
        />
        <button type="submit" className="game-search-button">Search</button>
      </form>
      <ul className="game-list">
        {games
          .filter(game => game.appid)
          .map(game => (
            <li key={game.appid} className="game-item">
              <span>{game.name}</span>
              <div>
                <button onClick={() => startSteamGame(game.appid)}>Start Game</button>
                <button onClick={() => openGameUrl(game.appid)}>Go to URL on Steam</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GameSearch;
