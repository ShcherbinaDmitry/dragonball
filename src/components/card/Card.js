import React, {  useState } from 'react';
import ModalComponent from '../modal/Modal.js';

const translation = {
  'USA': 'США',
  'Europe': 'Европа',
  'Japan': 'Япония',
  'Other': 'Другой регион',
  'Mint': 'Отличное',
  'Good': 'Хорошее',
  'Bad': 'Плохое',
  'Cartridge': 'Картридж',
  'Disk': 'Диск',
  'Box': 'Коробка',
  'Manual': 'Руководство',
  'Bonus': 'Бонус',
  'Limited': 'Лимитированное издание',
};

const Card = (props) => {
  const [modal, setModal] = useState('');
  const { 
    game: {
      _id: id,
      name,
      jpname,
      note,
      image,
      condition,
      kit,
      region,
      platform,
      createdAt,
      updatedAt,
    } 
  } = props;

  const handleClick = (e) => {
    e.preventDefault();

    setModal(!modal);
  };

  const isNew = ((Date.now() - new Date(createdAt)) / 1000 * 60 * 60 * 24 * 7) > 0;
  const updatedDate = new Date(updatedAt).toLocaleDateString('ru-RU');
  const kitBadges = kit
    .map((badge) => <div key={`${badge}-${id}`} className="col-auto bg-success badge badge-success">{translation[badge] || badge}</div>);
  const Modal = modal ? <ModalComponent handleModal={setModal} values={props.game} type='edit'/> : null;

  return (
    <div className="col col-12 col-sm-12 col-lg-6 col-xl-4 mb-3">
      <div className="card h-100">
        <img src="https://images.immediate.co.uk/production/volatile/sites/3/2021/01/Dragon-Ball-1-a5dc289.jpg?quality=90&webp=true&resize=864,576"
          className="card-img-top"
          alt="Game cover"/>
        <div className="card-body row align-items-center">
          <h5 className="card-title">Name: {name}</h5>
          {jpname && <p className="card-text">Японкое название: {jpname}</p>}
          <p className="card-text col-6">Регион: {translation[region] || region}</p>
          <p className="card-text col-6">Платформа: {platform}</p>
          {condition && <p className="card-text col-auto">Состояние: {translation[condition] || condition}</p>}
          {note && <p className="card-text col-12">Описание: {note}</p>}
          <div className="col-12">
            {kitBadges}
          </div>
          <button type="btn" className="btn btn-outline-primary m-2 col-auto align-self-end" onClick={handleClick}>
            Редактировать
          </button>
          {isNew && <p className="card-text align-self-end col-auto">! Новая !</p>}
          <p className="card-text align-self-end col-12"><small className="text-muted">Последнее обновление: {updatedDate}</small></p>
 
        </div>
      </div>
      {Modal}
    </div>
    );
}

export default Card;