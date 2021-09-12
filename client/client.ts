// Start coding!

import * as Cfx from 'fivem-js';

import './weather';
import './hideFrame';
import './time';
import CarManager from './car';
import { menuOpen, toggleNuiFrame } from './menuState';

CarManager.getInstance();

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

console.log('HUUTIstaaaaaaaaaaaa');

// eslint-disable-next-line no-undef
RegisterCommand(
  'adev',
  () => {
    toggleNuiFrame(!menuOpen);
  },
  false
);

setTick(async () => {
  // await Delay(10)
  if (IsControlJustPressed(1, 288)) {
    toggleNuiFrame(!menuOpen);
  }
});
