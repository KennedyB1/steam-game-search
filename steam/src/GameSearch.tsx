import React, { useState } from 'react';
import axios from 'axios';

interface Game {
  appid: number;
  name: string;
}

const GameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setGames([]);
      return;
    }

    try {
      const response = await axios.get(`/api/steam?searchTerm=${encodeURIComponent(searchTerm)}`);
      setGames(response.data.applist.apps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    fetchGames(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <ul>
        {games.map(game => (
          <li key={game.appid}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameSearch;
