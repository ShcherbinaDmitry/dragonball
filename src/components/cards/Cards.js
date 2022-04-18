import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { chunk } from 'lodash';
import { fetchGames } from '../../slices/gamesSlice.js';

import Card from './Card';
import Spinner from '../spinner/spinner.js';

const pageSizes = [6, 12, 24, 60];

const Cards = (props) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  const uiState = useSelector((state) => state.games.uiState);
  const gamesChunks = useSelector((state) => {
    const { games } = state.games;

    const chunks = chunk(games, pageSize);

    return chunks.map((items, index) => ({ items, pageNumber: index }));
  });
  
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleSize = (size) => {
    setCurrentPage(0);
    setPageSize(size);
  }

  if (uiState.loading) return <Spinner/>;

  if (!gamesChunks || gamesChunks.length === 0) return (
    <div className="container align-items-center">
      <div className="row">
        <div className="alert alert-warning">Не удалось загрузить игры из базы данных</div>
      </div>
    </div>

  );

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
