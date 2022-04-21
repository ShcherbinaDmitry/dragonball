import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Form } from 'react-bootstrap';
import { chunk } from 'lodash';
import { fetchGames } from '../../slices/gamesSlice.js';

import Card from './Card';
import Spinner from '../spinner/Spinner.js';

const pageSizes = [6, 12, 24, 60];

const Cards = (props) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  const uiState = useSelector((state) => state.games.uiState); 
  const gamesChunks = useSelector((state) => {
    const { searchStr, filterQuery: { regions, platforms, isAvailable } } = uiState;
    const { games } = state.games;

    const filteredGames = games.filter((game) => {
      // Check if available and if game matches filter query
      if (isAvailable && game.kit.length === 0) return false; 
      if (regions.length > 0 && !regions.includes(game.region)) return false;
      if (platforms.length > 0 && !platforms.includes(game.platform)) return false;

      return true;
    });

    // Search game based on search input
    const searchedGames = filteredGames.filter((game) => {
      return game.name.toLowerCase().includes(searchStr);
    });

    // Show games in chunks for pagination
    const chunks = chunk(searchedGames, pageSize);

    return chunks.map((items, index) => ({ items, pageNumber: index }));
  });
  
  useEffect(() => {
    // uploadGames everytime we do something
    dispatch(fetchGames());
  }, [dispatch]);

  const handleSize = (size) => {
    setCurrentPage(0);
    setPageSize(size);
  }

  if (uiState.loading) return <Spinner/>;

  if (!gamesChunks || gamesChunks.length === 0) {
    return (
      <div className="container align-items-center">
        <div className="row">
          <div className="alert alert-warning">Нет подходящих игр</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
          {gamesChunks[currentPage].items.map((game) => <Card key={game._id} game={game}/>)}
      </div>
      <div className="row">
        <div className="col-2">
          <span>Показывать по </span>
          <Form.Select size="lg" onChange={(e) => handleSize(e.target.value)} aria-label="Размер страницы">
            {pageSizes.map((item) => <option key={item} value={item}>{item}</option>)}
          </Form.Select>
        </div>
        <Pagination className="col-12 mt-3">
          {gamesChunks.map(({ pageNumber }) => (
            <Pagination.Item activeLabel="" key={pageNumber} onClick={() => setCurrentPage(pageNumber)} active={pageNumber === currentPage}>
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Cards;
