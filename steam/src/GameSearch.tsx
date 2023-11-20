import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Game {
  appid: number;
  name: string;
}

const GameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/steam');
        setGames(response.data.applist.apps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (inputValue.trim() !== '') {
      const filtered = games
        .filter(game => game.name.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 10);
      setFilteredGames(filtered);
    } else {
      setFilteredGames([]);
    }
  }, [inputValue, games]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <ul>
        {filteredGames.map(game => (
          <li key={game.appid}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameSearch;
