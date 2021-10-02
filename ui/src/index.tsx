import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { configure } from 'mobx';
// import { enableLogging } from 'mobx-logger';
import toast from 'react-hot-toast';
import Root from './ui/components/Root';

configure({
  enforceActions: 'never',
});
// enableLogging();

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
