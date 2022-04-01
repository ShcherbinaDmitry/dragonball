import React, { useState } from 'react';
import AddModal from './modal';

const Topbar = (props) => {
  const [modal, setModal] = useState('');  
  const { addGame } = props;
  const Modal = modal ? <AddModal handleModal={setModal}/> : null


  return (
    <nav className="navbar navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <form className="d-flex">
          <input className="form-control" placeholder="Find game"/>
          <button className="btn btn-outline-primary" type="sumbit">Search</button>
        </form>
        <button type="button" onClick={() => setModal(!modal)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
           Add Game
        </button>
      </div>
      {Modal}
    </nav>
  );
}

export default Topbar;