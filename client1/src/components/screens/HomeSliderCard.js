import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../App.css";

const Card = ({ property }) => {
  const { index, picture, text, author, location } = property;
  return (
    <div id={"card-${index}"} className='Card'>
      <img className = 'img' src={picture} alt={text} />
      <div className='details'>
        <span className='index'>{index + 1}</span>
        <p className='location'>{text}</p>
        <p className='location'>{author}</p>
        <p className='location'>{location}</p>
      </div>
    </div>
  );
};
export default Card;
