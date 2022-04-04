import React, { useState, useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import Card from './Card';
import AppContext from '../app-context';

const Cards = (props) => {
  const { dbService } = useContext(AppContext);
  //const [games, setGames] = useState({});
  const { games } = props;
  

  return (
    <div className="container">
      <div className="row">
        {games.map((game) => <Card key={game._id} game={game}/>)}
      </div>
    </div>
  );
};

export default Cards;
