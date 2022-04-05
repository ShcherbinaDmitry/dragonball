import React, {  useState } from 'react';

import ModalComponent from '../modal';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faStar } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {
  const [modal, setModal] = useState('');
  const { 
    game: {
      _id,
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
  const tags = 'action, rpg, jrpg, brawler';
  const badges = tags
    .split(',')
    .map((badge) => <span key={`${badge}-${_id}`} className="col m-1 p-1 bg-success badge badge-success">{badge}</span>);
  const Modal = modal ? <ModalComponent handleModal={setModal} values={props.game} type='edit'/> : null;

  return (
    <div className="col col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
      <div className="card h-100">
        <img src="https://images.immediate.co.uk/production/volatile/sites/3/2021/01/Dragon-Ball-1-a5dc289.jpg?quality=90&webp=true&resize=864,576"
          className="card-img-top"
          alt="Game cover"/>
        <div className="card-body row">
          <h5 className="card-title">Name: {name}</h5>
          {jpname && <p className="card-text">Japanese name: {jpname}</p>}
          <p className="card-text col-6">Region: {region}</p>
          <p className="card-text col-6">Platform: {platform}</p>
          {condition && <p className="card-text col-6">Condition: {condition}</p>}
          <p className="card-text col-6">New: {isNew.toString()}</p>
          <p className="card-text">Description: {note}</p>
          <p className="card-text">Kit: {kit}</p>
          {badges}
          <button type="btn" className="btn col-4 m-2" onClick={handleClick}>
            <FontAwesomeIcon icon={faPen} className="fa-xl"/>
          </button>
          <p class="card-text"><small className="text-muted">Последнее обновление: {updatedDate}</small></p>
        </div>
      </div>
      {Modal}
    </div>
    );
}

export default Card;