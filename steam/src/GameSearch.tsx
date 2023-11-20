import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Game {
  appid: number;
  name: string;
}

const GameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (inputValue.trim()) {
        fetchGames(inputValue);
      } else {
        setGames([]);
      }
    }, 500); // 500 ms delay

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue]);

  const fetchGames = async (searchTerm: string) => {
    try {
      const response = await axios.get(`/api/steam?searchTerm=${encodeURIComponent(searchTerm)}`);
      setGames(response.data.applist.apps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
