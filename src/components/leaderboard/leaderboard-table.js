import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import StarRating from '../common/star-rating';

import './leaderboard-table.css';

/*
 * Table component to display high scores
 */
class LeaderboardTable extends Component{

  static propTypes = {
    leaders: PropTypes.array.isRequired,
    totalRating: PropTypes.number.isRequired
  };

  makeLeaderRow = (key, leader)=>(
    <tr key={key} className="leader-table__row">
      <td>{key}</td>
      <td>{leader.name}</td>
      <td>{leader.moves}</td>
      <td className="leader-table__star-container"><StarRating rating={leader.rating} total={this.props.totalRating}/></td>
      <td>{leader.time}</td>
    </tr>
  );

  /*
   * Sort the high scores by rating, moves and then time
   * Display all as table rows
   */
  mapLeadersToSortedRows = (leaders)=>{
    const sorted = [...leaders].sort(sortBy('-rating', 'moves', 'time'));
    return sorted.map((leader, key)=>this.makeLeaderRow(key+1, leader));
  };

  render(){
    const {leaders} = this.props;
    return(
      <table className="leader-table">
        <tbody>
          <tr className="leader-table__header">
            <th>Rank</th>
            <th>Name</th>
            <th>Moves</th>
            <th>Rating</th>
            <th>Time</th>
          </tr>
          {this.mapLeadersToSortedRows(leaders)}
        </tbody>
      </table>
    );
  }
}

export default LeaderboardTable;
