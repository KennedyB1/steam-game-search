import React, { useState } from 'react';
import axios from 'axios';

interface Game {
  appid: number;
  name: string;
}

const GameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
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

  const logGameId = (appid: number) => {
    console.log('Game ID:', appid);
  };

  const openGameUrl = (appid: number) => {
    window.open(`https://store.steampowered.com/app/${appid}`, '_blank');
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={fetchGames}>Search</button>
      <ul>
        {games.map(game => (
          <li key={game.appid}>
            {game.name}
            <button onClick={() => logGameId(game.appid)}>Game</button>
            <button onClick={() => openGameUrl(game.appid)}>Open URL</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameSearch;
