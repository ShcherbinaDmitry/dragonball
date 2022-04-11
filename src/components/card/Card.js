import React, {  useState } from 'react';

import ModalComponent from '../modal';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faStar, faSertifi } from '@fortawesome/free-solid-svg-icons';


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
  const badges = [...kit, 'box', 'sddsad', 'dasdasd', '12312312', '31', '323123123asd']
    .map((badge) => <div key={`${badge}-${id}`} className="col-auto m-1 bg-success badge badge-success">{translation[badge] || badge}</div>);
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
          {condition && <p className="card-text col-6">Состояние: {translation[condition] || condition}</p>}
          <p className="card-text col">New: {isNew.toString()}</p>
          <p className="card-text">Описание: {note}</p>
          <p className="card-text">Комплект: {translation[kit] || kit}</p>
          {badges}
          <button type="btn" className="btn col-4 m-2" onClick={handleClick}>
            <FontAwesomeIcon icon={faPen} className="fa-xl"/>
          </button>
          <p className="card-text"><small className="text-muted">Последнее обновление: {updatedDate}</small></p>
        </div>
      </div>
      {Modal}
    </div>
    );
}

export default Card;