import React from 'react';
import PropTypes from 'prop-types';

import './navigation.button.css';

/*
 * Navigation button component. Displays nice animation on opening and closing navigation pane
 */
const navigationButton = ({onClick, close})=>{

  const buttonStateClass = close ? 'navigation__button--close': '';

  return (
    <div className={`navigation__button ${buttonStateClass}`} onClick={onClick}>
      <span className='navigation-button__icon'>&nbsp;</span>
    </div>
  );
};

navigationButton.propTypes = {
  close: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default navigationButton;
