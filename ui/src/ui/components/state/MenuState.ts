/* eslint-disable class-methods-use-this */
import { makeAutoObservable } from 'mobx';
import { fetchNui } from '../../utils/fetchNui';

interface Player {
  guid: string
  name: string
  id: string
  identifiers: {
    discord: string
    fivem: string
    ip: string
    license: string
    license2: string
    steam: string
  }
}

class MenuStateStore {
  target: Player| null = null

  players: Player[] = []

  constructor() {
    makeAutoObservable(this);
  }

  setTarget(targetId: number) {
    // fetchNui({resource: "ok", eventName: "ok"});
  }

  async getPlayers() {
    const { players: playersArray } = await fetchNui('getTargets');
    this.players = playersArray;
  }

  // getTargets
}

const menuState = new MenuStateStore();
export default menuState;
