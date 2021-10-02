// Start coding!

import * as Cfx from 'fivem-js';

import './weather';
import './hideFrame';
import './time';
import { menuOpen, SendReactMessage, toggleNuiFrame } from './menuState';
import VehicleManager from './Managers/Vehicle';
import MenuManager from './Managers/Menu';
import WeaponManager from './Managers/Weapon';
import NoclipManager from './Managers/Noclip';
import KeybindManager from './Managers/Keybinds';
import ClientManager from './Managers/Client';

VehicleManager.getInstance();
MenuManager.getInstance();
WeaponManager.getInstance();
NoclipManager.getInstance();
KeybindManager.getInstance();
ClientManager.getInstance();

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
