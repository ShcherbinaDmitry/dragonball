import React, { useState } from 'react';
import ModalComponent from '../modal/Modal';

const AddGameBtn = () => {
  const [modal, setModal] = useState(false);
  const Modal = modal ? <ModalComponent handleModal={setModal} type='add'/> : null;
 
  const handleClick = () => {
    setModal(!modal);
  };

  return (
    <div className="">
      <button title="Добавить игру" type="button" onClick={handleClick} className="col-auto btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        <span>+</span>
      </button>
      {Modal}
    </div>
  );
};

export default AddGameBtn;