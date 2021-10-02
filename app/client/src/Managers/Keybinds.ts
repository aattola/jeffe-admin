import { emitNetPromise } from '@jeffe/shared/events';
import { menuOpen, toggleNuiFrame } from '../menuState';

RegisterNuiCallbackType('bind');
RegisterNuiCallbackType('bindings');

type TBind = {internalBind: number, event: string, eventData: any}

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
      command: 'JEFFE-ADMIN-INTERNAL-BIND_1',
      desc: 'Bind spot 1',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_2',
      desc: 'Bind spot 2',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_3',
      desc: 'Bind spot 3',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_4',
      desc: 'Bind spot 4',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_5',
      desc: 'Bind spot 5',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_6',
      desc: 'Bind spot 6',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_7',
      desc: 'Bind spot 7',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_8',
      desc: 'Bind spot 8',
      defaultKey: 'F24',
    },
    {
      command: 'JEFFE-ADMIN-INTERNAL-BIND_9',
      desc: 'Bind spot 9',
      defaultKey: 'F24',
    },
  ]

  bindmap: TBind[] = []

  registerCommands(): void {
    // todo: commands

    RegisterCommand(
      'openMenuKeybind',
      () => {
        toggleNuiFrame(!menuOpen);
      },
      false,
    );

    this.keymaps.forEach((key) => {
      RegisterCommand(key.command, () => {
        this.handleCommand(key.command);
      }, false);
    });
  }

  removeSuggestions(): void {
    emit('chat:removeSuggestion', '/openMenuKeybind');

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

  handleCommand(command: string) {
    const [, number] = command.split('_');

    this.bindmap.forEach(async (bind) => {
      if (bind.internalBind !== Number(number)) return;
      await emitNetPromise(bind.event, bind.eventData);
    });
  }

  async handleBind(
    data: {bindSpot: number, event: string, data: string}, cb: (retData: any) => void,
  ): Promise<void> {
    if (!data.event) {
      cb({ ok: false, error: 'Event is not present in request.' });
      return;
    }

    if (data.bindSpot === 0) {
      this.bindmap = this.bindmap.filter((bind) => bind.event !== data.event);
      await emitNetPromise('jeffe-admin:saveBindings', { data: this.bindmap });
      cb({ ok: true });
      return;
    }

    const bindCheck = this.bindmap.filter((bind) => bind.internalBind === data.bindSpot);
    if (bindCheck.length > 0) return;

    const bindData = {
      internalBind: data.bindSpot,
      event: data.event,
      eventData: data.data,
    };
    this.bindmap.push(bindData);

    await emitNetPromise('jeffe-admin:saveBindings', { data: this.bindmap });

    cb({ ok: true });
  }

  bindings(
    data: any,
    cb: (responseData: any) => void,
  ): void {
    // todo: oikeasta paikasta hae bindit
    cb({ ok: true, bindings: this.bindmap });
  }

  async fetchMappingsFromServer() {
    const response = <{ok: boolean, configData: TBind[]}> await emitNetPromise('jeffe-admin:getBindings').catch((e) => {
      // Käytännössä ei keybindejä
    });

    if (!response?.configData) return;
    this.bindmap = response.configData;
  }

  constructor() {
    this.fetchMappingsFromServer();
    this.registerCommands();
    this.registerKeymappings();
    setTimeout(() => {
      this.removeSuggestions();
    }, 250);

    on('__cfx_nui:bind', (data: any, cb: (responseData: any) => void) => this.handleBind(data, cb));
    on('__cfx_nui:bindings', (data: any, cb: (responseData: any) => void) => this.bindings(data, cb));
  }
}

export default KeybindManager;
