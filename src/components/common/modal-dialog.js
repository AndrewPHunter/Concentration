import React from 'react';
import PropTypes from 'prop-types';

import './modal-dialog.css';

/*
 * Provides consistent style and animation to modal dialogs
 * uses a render prop to allow base component to be re-used
 */
const Modal = ({render})=>(
  <div className="modal__container">
    <div className="modal__body">
      {render()}
    </div>
  </div>
);

Modal.propTypes = {
  render: PropTypes.func.isRequired
};

export default Modal;
