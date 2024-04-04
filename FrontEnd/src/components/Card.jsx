import React from 'react';
import '../styles/SignUp.css';

const Card = ({ img, str, content, onClick, isSelected }) => {
  const handleCardClick = () => {
    onClick(str);
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
    >
      <img className='optionImg' src={img} alt={str} />
      <h3>{content}</h3>
    </div>
  );
};

export default Card;
