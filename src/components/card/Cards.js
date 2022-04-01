import React, { useState, useEffect } from 'react';
import Card from './Card';
import DBService from '../../service/dbService';

const Cards = (props) => {
  const dbService = new DBService();
  const [games, setGames] = useState({});
  
  useEffect(() => {
    dbService.getGames().then((data) => {
      setGames(data);
    })
  }, []);

  return (
    <div className="container">
      <div className="row">
        {Object.entries(games).map(([key, game]) => <Card key={key} game={game}/>)}
      </div>
    </div>
  );
};

export default Cards;
