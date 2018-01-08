import React, { Component } from 'react';
import GameBoard from './components/gameboard';
import DisplayBoard from './components/displayboard'
import {
  generateDeck
} from './game.utils';

import './App.css';


class App extends Component {

  state = {
    cards: generateDeck(),
    timeStart: new Date().getTime(),
    timerInterval: null,
    time: 0,
    moves: 0
  };

  componentDidMount = ()=>{
    const timerInterval = setInterval(this.updateTimer, 1000);
    this.setState(()=>({
      timerInterval
    }));
  };

  updateTimer = ()=>{
    this.setState((prevState)=>({
      time: new Date().getTime() - prevState.timeStart
    }));
  };

  restart = ()=>{

    const {interval} = this.state;
    clearInterval(interval);

    this.setState(()=>({
      cards:generateDeck(),
      timeStart: new Date().getTime(),
      time: 0,
      timerInterval: setInterval(this.updateTimer, 1000),
      moves: 0
    }));

  };

  onCardSelected = (index)=>{

    this.setState((prevState)=>{
      const cards = [...prevState.cards];
      cards[index].isFlipped = true;
      return {
        cards,
        moves: prevState.moves + 1
      };

    });
  };

  render(){

    const {cards, time, moves} = this.state;
    return(
      <div className="game">
        <div className="game__gameboard">
          <GameBoard cards={cards}
                     onCardSelected={this.onCardSelected}
          />
        </div>
        <div className="game__displayboard">
          <DisplayBoard starRating={3}
                        totalStars={3}
                        moves={moves}
                        time={time}
                        restart={this.restart}
          />
        </div>
      </div>

    );
  }
}

export default App;
