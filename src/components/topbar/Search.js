import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchGames } from '../../slices/gamesSlice';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);

  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;

    dispatch(searchGames(value));
  };

  return (
      <form className="col-auto mb-3">
        <input onChange={handleSearch} className="form-control col-12" name="search-string" id="filter" placeholder="Найти игру"/>
      </form>
  );
};

export default SearchComponent;