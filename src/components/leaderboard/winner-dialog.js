import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/modal-dialog';
import StarRating from '../common/star-rating';
import Button from '../common/button';

import './winner-dialog.css';

const winner = ({results, totalRating, onNameUpdate, onSubmit})=>(
  <div className="winner-dialog">
    <div className="winner-dialog__header">
      <h2 className="winner-dialog-title">Congratulations!!!!</h2>
    </div>
    <div className="winner-dialog__body">
      <div className="game-results">
        <ul className="game-results__list">
          <li className="game-results__item">
            <span className="game-results__item--bold">Moves:</span>{results.moves}
          </li>
          <li className="game-results__item">
            <span className="game-results__item--bold">Rating:</span>
            <div className="rating-container">
              <StarRating rating={results.rating} total={totalRating}/>
            </div>
          </li>
          <li className="game-results__item">
            <span className="game-results__item--bold">Time:</span>{results.time}
          </li>
        </ul>
      </div>
      <div className="leader-name">
        <input id="leaderName"
               placeholder="Name"
               type="text"
               className="leader-name__input"
               value={results.name}
               onChange={(event)=>onNameUpdate(event.target.value)}
        />
      </div>
    </div>
    <div className="winner-dialog__footer">
      <Button text="submit" onAction={onSubmit} className="winner-submit"/>
    </div>
  </div>
);

const WinnerDialog = (props)=><Modal render={winner.bind(null, props)}/>;

WinnerDialog.propTypes = {
  results: PropTypes.object.isRequired,
  totalRating: PropTypes.number.isRequired,
  onNameUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default WinnerDialog;
