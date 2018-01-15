import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';

export default class Card extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    onCardSelected: PropTypes.func.isRequired,
    matched: PropTypes.bool.isRequired
  };

  cardSelected = ()=>{
    if(!this.props.isFlipped){
      this.props.onCardSelected();
    }
  };

  render(){
    const {icon, isFlipped} = this.props;

    const cardClass = isFlipped ? 'card card--active': 'card';

    return(
      <div className={cardClass} onClick={this.cardSelected}>
        <div className="card__side card__side--front"/>
        <div className="card__side card__side--back">
          <Icon icon={icon} className="card__side--back-icon"/>
        </div>
      </div>
    );
  }
}
