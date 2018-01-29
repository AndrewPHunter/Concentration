import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {withGameEngine} from "../game/game.utils";
import Button from '../common/button';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

/*
 * Settings page component that allows options for clearing history and muting the background music
 */
class SettingsPage extends Component {

  static propTypes = {
    gameEngine: PropTypes.object.isRequired,
    gameState: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  /*
   * toggle the music, either muted or playing
   */
  toggleSound = ()=>{
    this.props.gameEngine.toggleSound();
  };

  /*
   * clear the local leader store asynchronously
   */
  onClearHistory = ()=>{
    this.props.gameEngine.clearStorage();
  };

  /*
   * close the navigation page by navigating to the game board
   */
  onClose = ()=>this.props.history.push({pathname: '/'});

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
