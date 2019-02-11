import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index.js';
import * as actions from './actions/index.js';
import App from './App';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-89062206-3'); //TODO, hide this?

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

document.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// Set up login state
fetch('/oauth/state')
  .then(r => r.json())
  .then(res => {
    if (res) {
      store.dispatch(actions.login(res));
    }
  });

// Set up cookie consent
const script = document.createElement('script');
script.setAttribute('async', '');
script.setAttribute('src', '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js');

script.onload = () => {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#252e39'
      },
      button: {
        background: '#14a7d0'
      }
    },
    position: 'bottom-left',
    content: {
      href: '/privacy'
    }
  });
};

document.head.appendChild(script);
