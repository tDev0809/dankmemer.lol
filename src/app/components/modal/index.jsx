import Modal from './modal';
import 'assets/styles/components/modal.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const modals = document.querySelector('#modals');

export default function createModal (component) {
  	return ReactDOM.render(<Modal component={component} />, modals);
}

document.addEventListener('keydown', (key) => {
	if (key.code === 'Escape' && document.querySelector('.backdrop')) return ReactDOM.unmountComponentAtNode(modals);
});

document.addEventListener('mousedown', (ev) => {
  	if (ev.target.className === 'modal') return ReactDOM.unmountComponentAtNode(modals);
});
