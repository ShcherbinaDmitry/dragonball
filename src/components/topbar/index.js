import React, { useState, useContext } from 'react';
import AddModal from '../modal';
import AppContext from '../app-context';

const Topbar = (props) => {
  const [modal, setModal] = useState('');
  const Modal = modal ? <AddModal handleModal={setModal} type='add'/> : null;

  const handleClick = () => {
    setModal(!modal);
    // dbService.addGame();
  }

  return (
    <nav className="navbar navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <form className="d-flex">
          <input className="form-control" placeholder="Найти игру"/>
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