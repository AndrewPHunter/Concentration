import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({text, onAction, className})=>(
  <button className={`btn ${className}`} onClick={onAction}>{`${text}`}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired
};

export default Button;
