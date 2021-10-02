import { emitNetPromise } from '@jeffe/shared/events';
import { menuOpen, toggleNuiFrame } from '../menuState';

RegisterNuiCallbackType('favorite');
RegisterNuiCallbackType('favorites');

type TFavorite = {id: string}

class FavoritesManager {
  protected static instance: FavoritesManager;

  static getInstance(): FavoritesManager {
    if (!FavoritesManager.instance) {
      FavoritesManager.instance = new FavoritesManager();
    }

    return FavoritesManager.instance;
  }

  favorites: TFavorite[] = []

  async handleFavorite(
    data: {accordion: {id: string}}, cb: (retData: any) => void,
  ): Promise<void> {
    const favWithout = this.favorites.filter((fav) => fav.id !== data.accordion.id);
    if (favWithout.length !== this.favorites.length) {
      // poistettiin jotain

      this.favorites = favWithout;
    } else {
      const favoriteData = {
        id: data.accordion.id,
      };
      this.favorites.push(favoriteData);
    }

    await emitNetPromise('jeffe-admin:saveFavorites', { data: this.favorites });

    cb({ ok: true });
  }

  getFavorites(
    data: any,
    cb: (responseData: any) => void,
  ): void {
    // todo: favorites paikasta oikeat favoritet
    cb({ ok: true, favorites: this.favorites });
  }

  async fetchFavoritesFromServer() {
    const response = <{ok: boolean, favorites: TFavorite[]}> await emitNetPromise('jeffe-admin:getFavorites').catch((e) => {
      // Käytännössä tällöin ei ole lemppareita
    });

    if (!response?.favorites) return;
    this.favorites = response.favorites;
  }

  constructor() {
    this.fetchFavoritesFromServer();

    on('__cfx_nui:favorite', (data: any, cb: (responseData: any) => void) => this.handleFavorite(data, cb));
    on('__cfx_nui:favorites', (data: any, cb: (responseData: any) => void) => this.getFavorites(data, cb));
  }
}

export default FavoritesManager;
