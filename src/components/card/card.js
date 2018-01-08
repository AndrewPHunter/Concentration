import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';

export default class Card extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  state = {
    isFlipped: false
  };

  cardSelected = ()=>{
    this.setState({
      isFlipped: !this.state.isFlipped
    });
  };

  render(){
    const {icon} = this.props;
    const {isFlipped} = this.state;

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
