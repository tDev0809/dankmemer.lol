import React from 'react';
import Backdrop from './Backdrop';

export default class Modal extends React.Component {
  render () {
    return (
      <Backdrop>
        <div className='modal'>
          <div className='modal-child'>
            {this.props.component}
          </div>
        </div>
      </Backdrop>
    );
  }
}
