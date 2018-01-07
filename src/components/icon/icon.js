import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({icon, ...props}) =>(
  <svg {...props} viewBox="0 0 32 32">
    <path d={icon}/>
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
