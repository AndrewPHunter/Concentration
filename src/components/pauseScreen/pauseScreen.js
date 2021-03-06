import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

import './pauseScreen.css';

/*
 * Provides nice pause over lay of game board and fires event when user
 * clicks the play button
 */
const PauseScreen = ({onClick})=>(
  <div className='pausescreen'>
    <Icon icon={ICONS.PLAY} className='pausescreen__icon' onClick={onClick}/>
  </div>
);

PauseScreen.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default PauseScreen;
