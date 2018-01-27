import React from 'react';
import PropTypes from 'prop-types';


const Button = ({text, onAction, className})=>(
  <a className={`btn ${className}`} onClick={onAction}>{`${text}`}</a>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired
};

export default Button;
