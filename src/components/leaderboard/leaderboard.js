import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WinnerDialog from './winner-dialog';
import LeaderTable from './leaderboard-table';
import {withRouter} from 'react-router';
import {withGameEngine}from '../game/game.utils';

class LeaderBoard extends Component{

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    gameEngine: PropTypes.object.isRequired
  };

  state = {
    leaders: [],
    results: null,
    name: ''
  };

  componentDidMount = async ()=>{
    const leaders = await this.props.gameEngine.loadLeaderBoard();
    const gameResults = (this.props.location.state) ? this.props.location.state.results : {moves: 2, rating: 2, time: '06:26'};

    this.setState(()=>({
      leaders: leaders || [],
      results: gameResults
    }));
  };

  onScoreSubmit = ()=>{
    const {results, name} = this.state;
    this.setState((prevState)=>({
      leaders: [...prevState.leaders, {name, ...results}],
      results: null,
      name: ''
    }), ()=>this.props.gameEngine.saveLeaderBoard(this.state.leaders));
  };

  onRestartGame = ()=> this.props.history.goBack();

  onNameUpdate = (name)=>this.setState(()=>({name}));

  emptyLeaderBoard = ()=>(
    <div className="empty-leaderboard">
      There are no saved leaders. Play a game to claim your spot!
    </div>
  );

  leaderList = ()=>(
    <div className="leader-container">
      <LeaderTable leaders={this.state.leaders}
                   totalRating={this.props.gameEngine.state.totalRating}/>
    </div>
  );

  renderBody = ()=>
    (this.state.leaders.length === 0) ? this.emptyLeaderBoard()
                                      : this.leaderList();

  render(){
    const {results, name} = this.state;

    return(
      <div className="leaderboard">
        {results && <WinnerDialog results={{name, ...results}}
                                  totalRating={this.props.gameEngine.state.totalRating}
                                  onNameUpdate={this.onNameUpdate}
                                  onSubmit={this.onScoreSubmit}
                                  onRestart={this.onRestartGame}/>
        }
        <div className="leaderboard__header">
          <h1 className="title">Leader Board</h1>
        </div>
        <div className="leaderboard__body">
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default withRouter(withGameEngine(LeaderBoard));
