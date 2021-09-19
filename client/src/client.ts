// Start coding!

import * as Cfx from 'fivem-js';

import './weather';
import './hideFrame';
import './time';
import { menuOpen, SendReactMessage, toggleNuiFrame } from './menuState';
import CarManager from './car';
import MenuManager from './menu';
import WeaponManager from './Weapon';
import NoclipManager from './noclip';

CarManager.getInstance();
MenuManager.getInstance();
WeaponManager.getInstance();
NoclipManager.getInstance();

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

console.log('HUUTIstaaaaaaaaaaaa');

// eslint-disable-next-line no-undef
RegisterCommand(
  'adev',
  () => {
    toggleNuiFrame(!menuOpen);
  },
  false,
);

RegisterCommand('devmode', (source: any, args: any) => {
  if (!args[0]) return;
  SendReactMessage('debug', args[0]);
}, false);

setTick(async () => {
  // await Delay(10)
  if (IsControlJustPressed(1, 288)) {
    toggleNuiFrame(!menuOpen);
  }
});
