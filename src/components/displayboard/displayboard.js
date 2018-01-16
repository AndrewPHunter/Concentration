import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';


class DisplayBoard extends Component {

  static propTypes = {
    starRating: PropTypes.number.isRequired,
    totalStars: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    restart: PropTypes.func
  };

  generateStars = ()=>{
    const {starRating, totalStars} = this.props;
    const stars = [
      ...[...Array(starRating)].map((_,index)=>(
        <Icon icon={ICONS.STAR_FULL} className={`displayboard__star displayboard__star--${starRating}`} key={index}/>
      )),
      ...[...Array(totalStars - starRating)].map((_,index)=>(
        <Icon icon={ICONS.STAR_EMPTY} className={`displayboard__star displayboard__star--${starRating}`} key={index+3}/>
      ))
    ];
    return(
      <div className="displayboard__stars">
        {stars}
      </div>
    );
  };

  render(){

    const {moves, time, restart} = this.props;

    return(
      <div className="displayboard">
        <div className="displayboard__section">
          {this.generateStars()}
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
