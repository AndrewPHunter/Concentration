import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {withGameEngine} from "../game/game.utils";
import Button from '../button';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

class SettingsPage extends Component {

  static propTypes = {
    gameEngine: PropTypes.object.isRequired,
    gameState: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  toggleSound = ()=>{
    this.props.gameEngine.toggleSound();
  };

  onClearHistory = ()=>{

  };

  onClose = ()=>this.props.history.goBack();

  render(){

    const {muted} = this.props.gameState;
    const icon = muted ? ICONS.VOLUME_MUTE : ICONS.VOLUME_HIGH;

    return(
      <div className="settings">
        <div className="settings__header">
          <h2 className='title'>Settings</h2>
        </div>
        <div className="settings__options">
          <ul className="settings-list">
            <li className="settings-item">
              <div className="settings-item__text">
                Clear Local Storage
              </div>
              <div className="settings-item__btn">
                <Button text="clear" onAction={this.onClearHistory} className='btn-clear'/>
              </div>
            </li>
            <li className="settings-item">
              <div className="settings-item__text">
                Background Music
              </div>
              <div className="settings-item__btn">
                <Icon icon={icon} className="settings__icon" onClick={this.toggleSound}/>
              </div>
            </li>
          </ul>
        </div>
        <div className="settings__footer">
          <Button text="close" onAction={this.onClose} className="btn-save"/>
        </div>
      </div>
    );
  }
}

export default withRouter(withGameEngine(SettingsPage));
