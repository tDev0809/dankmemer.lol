import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-89062206-3'); //TODO, hide this?


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

document.addEventListener('drop', (e) =>
{
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('dragover', (e) =>
{
  e.preventDefault();
  e.stopPropagation();
});