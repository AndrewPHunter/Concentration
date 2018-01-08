import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card';

const renderCards = (cards) =>(
  cards.map((card, index)=>(
    <div className="gameboard__card" key={index}>
      <Card icon={card.icon} name={card.name}/>
    </div>
  ))
);

const GameBoard = (props)=>{

  return(
    <div className="gameboard">
      {renderCards(props.cards)}
    </div>
  );
};

GameBoard.propTypes = {
  cards: PropTypes.array.isRequired
};

export default GameBoard;
