import Modal from './Modal';
import './Modal.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const modals = document.querySelector('#modals');

export default function createModal (component) {
  return ReactDOM.render(
    <Modal component={component} />,
    modals
  );;
}

document.addEventListener('keydown', (key) => {
  if (key.code === 'Escape' && document.querySelector('.backdrop')) {
    ReactDOM.unmountComponentAtNode(modals);
  }
});

document.addEventListener('mousedown', (ev) => {
  if (ev.path[0].className === 'modal') {
    ReactDOM.unmountComponentAtNode(modals);
  }
});
