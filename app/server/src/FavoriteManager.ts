import { onNetPromise } from '@jeffe/shared/events';
import ConfigManager from './ConfigManager';
import { parsePlayerIdentifiers } from './utils';

const config = ConfigManager.getInstance();

class ServerFavoritesManager {
  protected static instance: ServerFavoritesManager;

  static getInstance(): ServerFavoritesManager {
    if (!ServerFavoritesManager.instance) {
      ServerFavoritesManager.instance = new ServerFavoritesManager();
    }

    return ServerFavoritesManager.instance;
  }

  constructor() {
    onNetPromise('jeffe-admin:saveFavorites', this.handleFavorite);
    onNetPromise('jeffe-admin:getFavorites', this.handleGetFavorites);
  }

  async handleGetFavorites(data: {identifier: any, data: any}, cb: (callbackData: any, source: number) => void, source: number): Promise<void> {
    const identifiers = <any>parsePlayerIdentifiers(getPlayerIdentifiers(source));
    const identifier = identifiers.steam;

    const favorites = await config.readFromConfig('favorites', identifier).catch(() => {
      cb({ ok: false, favorites: null }, source);
    });

    cb({ ok: true, favorites }, source);
  }

  async handleFavorite(data: {identifier: any, data: any}, cb: (callbackData: any, source: number) => void, source: number): Promise<void> {
    const identifiers = <any>parsePlayerIdentifiers(getPlayerIdentifiers(source));
    const identifier = identifiers.steam;

    await config.writeToConfg('favorites', data.data, identifier).catch((e) => {
      console.log('favvoriting error', e);
    });

    cb({ ok: true }, source);
  }
}

export default ServerFavoritesManager;
