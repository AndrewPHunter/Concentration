import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withGameEngine} from "../game/game.utils";
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

class SettingsPage extends Component {

  static propTypes = {
    gameEngine: PropTypes.object.isRequired,
    gameState: PropTypes.object.isRequired
  };

  toggleSound = ()=>{
    this.props.gameEngine.toggleSound();
  };

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
                <button className="btn-clear">Clear</button>
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
          <button className='btn-save'>Save</button>
        </div>
      </div>
    );
  }
}

export default withGameEngine(SettingsPage);
