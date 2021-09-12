import React from 'react';
import ReactDom from 'react-dom';

import { RecoilRoot } from 'recoil';
import Root from './src/components/Root';

ReactDom.render(
  <RecoilRoot>
    <Root />
  </RecoilRoot>,
  document.getElementById('app')
);
