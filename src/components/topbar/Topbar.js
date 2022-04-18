import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames, sortGames } from '../../slices/gamesSlice.js';
import cn from 'classnames';

import ModalComponent from '../modal/Modal.js';

const sortValues = [
  { value: "name", text: 'Название'},
  { value: "platform", text:'Платформа' },
  { value: "region", text:'Регион'},
  { value: "updatedAt", text:'Последнее обновление' },
];

const Topbar = ({ setFilter }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState('');
  const Modal = modal ? <ModalComponent handleModal={setModal} type='add'/> : null;
  const activeSort = useSelector((state) => state.games.uiState.sort);
 
  const handleClick = () => {
    setModal(!modal);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(e.target.value);

    dispatch(filterGames(value));
  };

  const generateSortButtons = (buttons) => (<div className="btn-group">
    {buttons.map((btn, i) => {
      const btnClasses = cn('btn', btn.value === activeSort ? 'btn-primary' : 'btn-outline-primary');
      
      return (
        <button
          key={i}
          onClick={() => {
            dispatch(sortGames(btn.value));         
          }}
          className={btnClasses}>
            {btn.text}
        </button>
      );
    })}
  </div>);

  return (
    <nav className="navbar navbar-light bg-light sticky-top mb-3">
      <div className="container-fluid">
        <form className="d-flex">
          <input onChange={handleFilter} className="form-control" name="filter-string" id="filter" placeholder="Найти игру"/>
          <button className="btn btn-outline-primary" type="sumbit">Поиск</button>
        </form>
        <div className="btn-group">
          {generateSortButtons(sortValues)}
        </div>

        <button type="button" onClick={handleClick} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
           Добавить игру
        </button>
      </div>
      {Modal}
    </nav>
  );
}

export default Topbar;