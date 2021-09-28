/* eslint-disable class-methods-use-this */
import { makeAutoObservable } from 'mobx';
import { fetchNui } from '../../utils/fetchNui';
import asyncWrapper from '../../utils/asyncWrapper';

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

  self: Player | null = null

  players: Player[] = []

  constructor() {
    makeAutoObservable(this);
  }

  async getPlayers() {
    const [data, error] = await asyncWrapper(fetchNui('getTargets'));
    if (error) return;

    const { players: playersArray, youAreThisGuidSmile } = data;

    playersArray.forEach((player: Player) => {
      if (player.guid === youAreThisGuidSmile) {
        this.target = player;
        this.self = player;
      }
    });

    this.players = playersArray;
  }
}

const menuState = new MenuStateStore();
export default menuState;
