import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RecoilRoot } from 'recoil';
import { configure } from 'mobx';
import Root from './ui/components/Root';
import reportWebVitals from './reportWebVitals';

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <RecoilRoot>
    <Root />
  </RecoilRoot>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
