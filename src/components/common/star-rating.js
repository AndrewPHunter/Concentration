import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import ICONS from '../icon/icons.constants';

import './star-rating.css';

const StarRating = ({rating, total})=>{
  const stars = [
    ...[...Array(rating)].map((_,index)=>(
      <Icon icon={ICONS.STAR_FULL} className={`star star--${rating}`} key={index}/>
    )),
    ...[...Array(total - rating)].map((_,index)=>(
      <Icon icon={ICONS.STAR_EMPTY} className={`star--${rating}`} key={index+3}/>
    ))
  ];
  return(
    <div className="star-container">
      {stars}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default StarRating;
