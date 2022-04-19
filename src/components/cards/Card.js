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

  // console.log(image);
  const imagePath = `http://localhost:3000/public/${image}`;

  const handleClick = (e) => {
    e.preventDefault();

    setModal(!modal);
  };

  const dateDiff = ((Date.now() - new Date(createdAt)) - (1000 * 60 * 60 * 24 * 7));
  const isNew = dateDiff < 0;

  const updatedDate = new Date(updatedAt).toLocaleDateString('ru-RU');
  const kitBadges = kit
    .map((badge) => <div key={`${badge}-${id}`} className="col-auto bg-primary badge">{translation[badge] || badge}</div>);
  const Modal = modal ? <ModalComponent handleModal={setModal} values={props.game} type='edit'/> : null;
  
  // if (image.includes('.jpg')) {
  //   return <img src={imagePath} alt="Game cover" />
  // }

  return (
    <div className="card col-sm-12 col-md-6 col-lg-4">
        <img src={imagePath}
          style={{objectFit: 'contain'}}
          className="card-img-top img-fluid h-50 border"
          alt="Game cover"/>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">Name: {name}</h5>
          {jpname && <p className="card-text">Японкое название: {jpname}</p>}
          <p className="card-text col-6">Регион: {translation[region] || region}</p>
          <p className="card-text col-6">Платформа: {platform}</p>
          {condition && <p className="card-text col-auto">Состояние: {translation[condition] || condition}</p>}
          {note && <p className="card-text col-12">Описание: {note}</p>}
          {
            kitBadges.length > 0 && 
            <div className="col-12 mb-3">
              {kitBadges}
            </div>
          }
          <button type="btn" className="mt-auto align-self-center btn btn-outline-primary" onClick={handleClick}>
            Редактировать
          </button>
      </div>
      <div className="card-footer d-flex">
          <div className="col-9">
            <small className="text-muted">Последнее обновление: {updatedDate}</small>
          </div>
          {isNew && <img className="img-fluid col-3" alt="New icon" src="new.ico"/>}
          </div>
      {Modal}
    </div>
    );
}

export default Card;