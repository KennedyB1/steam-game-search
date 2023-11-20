import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Game {
  appid: number;
  name: string;
}

const GameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const fetchGames = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const response = await axios.get(`/api/steam?searchTerm=${encodeURIComponent(searchTerm)}`);
      setGames(response.data.applist.apps);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.trim()) {
        fetchGames(inputValue);
      } else {
        setGames([]);
      }
    }, 500); // 500 ms delay

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {isSearching && <div>Searching...</div>}
      <ul>
        {games.map(game => (
          <li key={game.appid}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameSearch;
