import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WinnerDialog from './winner-dialog';
import LeaderTable from './leaderboard-table';
import {withRouter} from 'react-router';
import {withGameEngine}from '../game/game.utils';

/*
 * Main leader board component that controls logic for displaying dialog
 * and loading list from store
 */
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

  /*
   * asynchronously load leader list from store to not block rendering
   * Check if coming to leader board from a game win
   */
  componentDidMount = async ()=>{
    const leaders = await this.props.gameEngine.loadLeaderBoard();
    const gameResults = (this.props.location.state) ? this.props.location.state.results : null;

    this.setState(()=>({
      leaders: leaders || [],
      results: gameResults
    }));
  };

  /*
   * update leader list with user info on score submit and reset state to clear dialog
   * Once state updated, save list to store asynchronously
   */
  onScoreSubmit = ()=>{
    const {results, name} = this.state;
    this.setState((prevState)=>({
      leaders: [...prevState.leaders, {name, ...results}],
      results: null,
      name: ''
    }), ()=>this.props.gameEngine.saveLeaderBoard(this.state.leaders));
  };

  /*
   * navigate back to game board if user wants to restart game per rubric
   */
  onRestartGame = ()=> this.props.history.goBack();

  /*
   * needed to maintain user name on input
   */
  onNameUpdate = (name)=>this.setState(()=>({name}));

  /*
   * element to display if no leaders found in storage
   */
  emptyLeaderBoard = ()=>(
    <div className="empty-leaderboard">
      There are no saved leaders. Play a game to claim your spot!
    </div>
  );

  /*
   * render the leader list component
   */
  leaderList = ()=>(
    <div className="leader-container">
      <LeaderTable leaders={this.state.leaders}
                   totalRating={this.props.gameEngine.state.totalRating}/>
    </div>
  );

  /*
   * if we have a list to display, display that, if not display empty leader list message
   */
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
