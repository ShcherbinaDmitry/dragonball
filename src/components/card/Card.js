import React, {  useState } from 'react';
import cn from 'classnames';

import AddModal from '../modal';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    console.log('Clicked on edit icon');
    setModal(!modal);
  };

  const Modal = modal ? <AddModal handleModal={setModal} values={props.game} type='edit'/> : null;


  const isNew = ((Date.now() - new Date(createdAt)) / 1000 * 60 * 60 * 24 * 7) > 0;

  const tags = 'action, rpg, jrpg, brawler';
  const badges = tags
    .split(',')
    .map((badge) => <span key={`${badge}-${_id}`} className="col mb-3 p-1 bg-success badge badge-success">{badge}</span>)


  return (
    <div className="col col-12 col-sm-6 col-md-4 col-lg-4">
      <div className="card">
        <img src="https://images.immediate.co.uk/production/volatile/sites/3/2021/01/Dragon-Ball-1-a5dc289.jpg?quality=90&webp=true&resize=864,576"
          className="card-img-top"
          alt="Game cover"/>
        <div className="card-body">
          <h5 className="card-title">Name: {name}</h5>
          <p className="card-text">Japanese name: {jpname}</p>
          <p className="card-text">Region: {region}</p>
          <p className="card-text">Platform: {platform}</p>
          <p className="card-text">Description: {note}</p>
          <p className="card-text">Kit: {kit}</p>
          <p className="card-text">Condition: {condition}</p>
          <p className="card-text">New: {isNew.toString()}</p>
          {badges}
          <button type="btn" className="btn col-4 m-2" onClick={handleClick}>
            <FontAwesomeIcon icon={faPen} className="fa-xl"/>
          </button>

        </div>
      </div>
      {Modal}
    </div>
    );
}

export default Card;