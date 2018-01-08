import React, { Component } from 'react';
import GameBoard from './components/gameboard';
import DisplayBoard from './components/displayboard'
import {
  generateDeck
} from './game.utils';

import './App.css';


class App extends Component {

  state = {
    cards: generateDeck()
  };

  render(){

    const {cards} = this.state;

    return(
      <div className="game">
        <div className="game__gameboard">
          <GameBoard cards={cards}/>
        </div>
        <div className="game__displayboard">
          <DisplayBoard starRating={3} totalStars={3} moves={2} time='12:22'/>
        </div>
      </div>

    );
  }
}

export default App;
