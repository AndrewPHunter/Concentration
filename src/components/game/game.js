import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameBoard from '../gameboard';
import DisplayBoard from '../displayboard';
import PauseScreen from '../pauseScreen';
import {withGameEngine, timeout} from './game.utils';

class Game extends Component{

  static propTypes = {
    gameState: PropTypes.object.isRequired,
    gameEngine: PropTypes.object.isRequired
  };

  componentDidMount = ()=>this.props.gameEngine.newGame();

  onCardSelected = (index)=>{
    const {gameEngine} = this.props;
    gameEngine.cardSelected(index);
  };

  restartGame = async ()=>{
    const {gameEngine} = this.props;
    gameEngine.flipAllCards();
    //HACK: Wait for animation to finish
    await timeout(800);
    gameEngine.newGame();
  };
  
  resumeGame = ()=>{
    this.props.gameEngine.resumeGame();
  };

  render(){
    const {cards, rating, totalRating, moves, time, paused} = this.props.gameState;

    return(
      <div className="game">
        {paused &&
          <div className='game__pausescreen'>
            <PauseScreen onClick={this.resumeGame}/>
          </div>  
        }
        <div className="game__gameboard">
          <GameBoard cards={cards}
                     onCardSelected={this.onCardSelected}
          />
        </div>
        <div className="game__displayboard">
          <DisplayBoard starRating={rating}
                        totalStars={totalRating}
                        moves={moves}
                        time={time}
                        restart={this.restartGame}
          />
        </div>
      </div>

    );
  }

}

export default withGameEngine(Game);
