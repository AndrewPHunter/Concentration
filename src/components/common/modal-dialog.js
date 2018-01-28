import React from 'react';
import PropTypes from 'prop-types';

import './modal-dialog.css';

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
