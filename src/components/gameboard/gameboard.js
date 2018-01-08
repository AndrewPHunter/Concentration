import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card';

const renderCards = (cards, onCardSelected) =>(
  cards.map((card, index)=>(
    <div className="gameboard__card" key={index}>
      <Card icon={card.icon}
            name={card.name}
            isFlipped={card.isFlipped}
            onCardSelected={onCardSelected.bind(null,index)}
      />
    </div>
  ))
);

const GameBoard = ({cards, onCardSelected})=>{

  return(
    <div className="gameboard">
      {renderCards(cards, onCardSelected)}
    </div>
  );
};

GameBoard.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardSelected: PropTypes.func.isRequired
};

export default GameBoard;
