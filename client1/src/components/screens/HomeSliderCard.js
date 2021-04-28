import React from "react";

import "../../css/templatemo_style.css";

const Card = ({ property }) => {
  const { index, picture, text, author, location } = property;
  return (
    <div id={"card-${index}"} className='Card'>
      <img className='img' src={picture} alt={text} />
      <div className='details'>
        <span className='index'>{index + 1}</span>
        <h3>{text}</h3>
        <h3>{author}</h3>
        <h3>{location}</h3>
      </div>
    </div>
  );
};
export default Card;
