import React from 'react';
import Backdrop from './backdrop';
import { ToastContainer } from 'react-toastify';

export default class Modal extends React.Component {
  render () {
    return (
      <Backdrop>
        <div className='modal'>
          <div className='modal-child'>
            {this.props.component}
          </div>
        </div>
        <ToastContainer />
      </Backdrop>
    );
  }
}
