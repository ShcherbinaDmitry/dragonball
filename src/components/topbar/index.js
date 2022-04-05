import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterGames } from '../../slices/gamesSlice';
import ModalComponent from '../modal';


const Topbar = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState('');
  const Modal = modal ? <ModalComponent handleModal={setModal} type='add'/> : null;

  const handleClick = () => {
    setModal(!modal);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const { value } = e.target.filter;
    console.log(e.target.filter.value);

    dispatch(filterGames(value));
  };

  return (
    <nav className="navbar navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <form className="d-flex" onSubmit={handleFilter}>
          <input className="form-control" name="filter-string" id="filter" placeholder="Найти игру"/>
          <button className="btn btn-outline-primary" type="sumbit">Поиск</button>
        </form>
        <button type="button" onClick={handleClick} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
           Добавить игру
        </button>
      </div>
      {Modal}
    </nav>
  );
}

export default Topbar;