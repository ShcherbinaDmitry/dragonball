import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../slices/gamesSlice';
import Card from './Card';


const Cards = (props) => {
  const dispatch = useDispatch();

  const games = useSelector((state) => state.games.games);
  
  useEffect(() => {
    dispatch(fetchGames())
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
         {games.map((game) => <Card key={game._id} game={game} handleRemove={1}/>)}
      </div>
    </div>
  );
};

export default Cards;
