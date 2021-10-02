import { onNetPromise } from '@jeffe/shared/events';
import ConfigManager from './ConfigManager';
import { parsePlayerIdentifiers } from './utils';

const config = ConfigManager.getInstance();

class ServerKeybindManager {
  protected static instance: ServerKeybindManager;

  static getInstance(): ServerKeybindManager {
    if (!ServerKeybindManager.instance) {
      ServerKeybindManager.instance = new ServerKeybindManager();
    }

    return ServerKeybindManager.instance;
  }

  constructor() {
    onNetPromise('jeffe-admin:saveBindings', this.handleBind);
    onNetPromise('jeffe-admin:getBindings', this.handleGetBindings);
  }

  async handleGetBindings(data: {identifier: any, data: any}, cb: (callbackData: any, source: number) => void, source: number): Promise<void> {
    const identifiers = <any>parsePlayerIdentifiers(getPlayerIdentifiers(source));
    const identifier = identifiers.steam;

    const configData = await config.readFromConfig('bindings', identifier).catch(() => {
      cb({ ok: false, configData: null }, source);
    });

    cb({ ok: true, configData }, source);
  }

  async handleBind(data: {identifier: any, data: any}, cb: (callbackData: any, source: number) => void, source: number): Promise<void> {
    const identifiers = <any>parsePlayerIdentifiers(getPlayerIdentifiers(source));

    const identifier = identifiers.steam;
    await config.writeToConfg('bindings', data.data, identifier);

    cb({ ok: true }, source);
  }
}

export default ServerKeybindManager;
