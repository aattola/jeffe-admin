import Cfx from 'fivem-js';
import { menuOpen, toggleNuiFrame } from '../menuState';

class KeybindManager {
  protected static instance: KeybindManager;

  static getInstance(): KeybindManager {
    if (!KeybindManager.instance) {
      KeybindManager.instance = new KeybindManager();
    }

    return KeybindManager.instance;
  }

  keymaps = [
    {
      command: 'openMenuKeybind',
      desc: 'Open JEFFe-Admin Menu',
      defaultKey: 'F1',
    },
  ]

  registerCommands(): void {
    // todo: commands

    RegisterCommand(
      'openMenuKeybind',
      () => {
        toggleNuiFrame(!menuOpen);
      },
      false,
    );
  }

  removeSuggestions(): void {
    this.keymaps.forEach((key) => {
      emit('chat:removeSuggestion', `/${key.command}`);
    });
  }

  registerKeymappings(): void {
    // todo: toi toimimaan
    // RegisterKeyMapping('+first', 'First keybind', 'keyboard', 'F24');
    this.keymaps.forEach((key) => {
      RegisterKeyMapping(key.command, key.desc, 'keyboard', key.defaultKey);
    });
  }

  constructor() {
    this.registerCommands();
    this.registerKeymappings();
    this.removeSuggestions();
  }
}

export default KeybindManager;
