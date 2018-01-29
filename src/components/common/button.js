import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

/*
* Wrapper around button element to provide nice hover and click animations and styles
*/

const Button = ({text, onAction, className})=>(
  <button className={`btn ${className}`} onClick={onAction}>{`${text}`}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired
};

export default Button;
