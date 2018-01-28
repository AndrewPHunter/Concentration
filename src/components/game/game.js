import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import Audio from '../audio/audio';
import GameBoard from '../gameboard';
import DisplayBoard from '../displayboard';
import PauseScreen from '../pauseScreen';
import {withGameEngine, timeout} from './game.utils';

class Game extends Component{

  static propTypes = {
    gameState: PropTypes.object.isRequired,
    gameEngine: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static songList = [
    '/music/In_The_House.mp3',
    '/music/Ability_To_Dance.mp3',
    '/music/Cyber_Party.mp3',
    '/music/Club_Dance.mp3',
    '/music/Dance_Attack.mp3'
  ];

  componentDidMount = ()=>{
    if(this.props.gameState.inProgress) return;
    this.props.gameEngine.newGame();
  };

  onCardSelected = async (index)=>{
    const {gameEngine, gameState} = this.props;
    await gameEngine.cardSelected(index);
    if(gameEngine.endGame()){

      console.log('game over');
      this.props.history.push({
        pathname: '/leaderboard',
        state:{
          results: {
            moves: gameState.moves,
            rating: gameState.rating,
            time: gameState.time
          }
        }
      });
    }
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
        <Audio songs={Game.songList}/>
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

export default withRouter(withGameEngine(Game));
