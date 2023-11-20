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
    try {
      const response = await axios.get('/api/steam');
      console.log(response.data); // Log the response data
      setGames(response.data.applist.apps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Filter games based on input and limit to 10, but only if there is input
  const filteredGames = inputValue.trim() 
    ? games.filter(game => game.name.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 10)
    : [];

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={fetchGames}>Load Games</button>
      <ul>
        {filteredGames.map(game => (
          <li key={game.appid}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameSearch;
