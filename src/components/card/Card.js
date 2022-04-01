import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

// import '@fortawesome/fontawesome-svg-core';


const Card = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Clicked on edit icon');
  };

  const { 
    game: {
      id,
      name,
      jpName,
      note,
      image,
      tags,
      platform,
      kit,
      region,
      createdAt,
    } 
  } = props;

  const badges = tags
    .split(',')
    .map((badge) => <span key={`${badge}-${id}`} className="col mb-3 p-1 bg-success badge badge-success">{badge}</span>)
  
  // console.log(badges);

  return (
    <div className="col col-12 col-sm-6 col-md-4 col-lg-4">
      <div className="card">
        <img src={image} className="card-img-top" alt="game-image"/>
        <div className="card-body">
          <h5 className="card-title">Name: {name}</h5>
          <p className="card-text">Japanese name: {jpName}</p>
          <p className="card-text">Description: {note}</p>
          <p className="card-text">Platform: {platform}</p>
          {badges}
          <button type="btn" className="btn col-12 m-2" onClick={handleClick}>
            <FontAwesomeIcon icon={faPen} className="fa-xl"/>
          </button>
        </div>
      </div>
    </div>
    );
}

export default Card;