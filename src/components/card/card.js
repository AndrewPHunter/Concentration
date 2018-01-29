import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import Icons from '../icon/icons.constants';

export default class Card extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    onCardSelected: PropTypes.func.isRequired,
    matched: PropTypes.bool.isRequired
  };

  //fires the card selected event only if the card is not already flipped
  cardSelected = ()=>{
    if(!this.props.isFlipped){
      this.props.onCardSelected();
    }
  };

  render(){
    const {icon, isFlipped, matched} = this.props;

    const cardClass = isFlipped ? 'card card--active': 'card';
    const matchClass = matched ? 'card--matched' : '';

    return (
      <div className={`${cardClass} ${matchClass}`} onClick={this.cardSelected}>
        <div className="card__side card__side--front">
          <Icon icon={Icons.OWL} className="card__side-icon card__side-icon--front"/>
        </div>
        <div className="card__side card__side--back">
          <Icon icon={icon} className="card__side-icon card__side-icon--back"/>
        </div>
      </div>

    );
  }
}
