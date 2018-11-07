import React from 'react';
import ReactGA from 'react-ga';

const newVisitor = () => {
  ReactGA.event({
    category: 'New Visitor',
    action: 'Opened WebPage'
  });
};

const trackPageVisit = (pageName) => {
    ReactGA.event({
      category: 'Page Visit',
      action: `Visit ${pageName}`
    });
  };

const onClickLink = (clicked) => {
    ReactGA.event({
      category: 'Clicked Link',
      action: `Click ${clicked}`
    });
  };

export {
    newVisitor,
    onClickLink,
    trackPageVisit
  };