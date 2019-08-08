import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index.js';
import * as actions from './actions/index.js';
import loadScript from './util/loadScript.js';
import App from './App.jsx';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(thunk)
  )
);
window.mainStore = store;

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
fetch('/oauth/state', { credentials: 'same-origin' })
  .then(r => r.json())
  .then(res => {
    if (res) {
      store.dispatch(actions.login(res));
    }
  });

fetch('/api/discount')
  .then(r => r.json())
  .then(res => (
    store.dispatch(actions.discount(res))
  ));

// Set up cookie consent
loadScript('//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js')
  .then(() => window.cookieconsent.initialise({
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
  }));


if ('serviceWorker' in navigator) {
  import('./fix-caching.js');
  // navigator.serviceWorker.register('/service-worker.js').then(registration => {
  //   console.log('SW registered: ', registration);
  // }).catch(registrationError => {
  //   console.log('SW registration failed: ', registrationError);
  // });
}