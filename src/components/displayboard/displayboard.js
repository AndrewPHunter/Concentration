import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRating from '../common/star-rating';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

/*
 * Display board providing player game information during play
 */
class DisplayBoard extends Component {

  static propTypes = {
    starRating: PropTypes.number.isRequired,
    totalStars: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    restart: PropTypes.func
  };

  render(){

    const {moves, time, restart, starRating, totalStars} = this.props;

    return(
      <div className="displayboard">
        <div className="displayboard__section">
          <div className="displayboard__stars">
            <StarRating rating={starRating} total={totalStars}/>
          </div>
          <div className="displayboard__moves">
            <p className="displayboard__move-count">
              {moves} Moves
            </p>
          </div>
        </div>
        <div className="displayboard__section">
          <p className="displayboard__time">
            {time}
          </p>
        </div>
        <div className="displayboard__section">
          <Icon icon={ICONS.LOOP} className="displayboard__restart" onClick={restart}/>
        </div>
      </div>
    );
  }
}

export default DisplayBoard;
