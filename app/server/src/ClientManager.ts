import { onNetPromise } from '@jeffe/shared/events';

class ServerClientManager {
  protected static instance: ServerClientManager;

  static getInstance(): ServerClientManager {
    if (!ServerClientManager.instance) {
      ServerClientManager.instance = new ServerClientManager();
    }

    return ServerClientManager.instance;
  }

  constructor() {
    onNetPromise('jeffe-admin:kickPlayer', this.handleKick);
    onNetPromise('jeffe-admin:teleportPlayer', this.handleTeleport);
  }

  async handleTeleport(data: {target: any}, cb: (callbackData: any, source: number) => void) {
    // todo: perms
    const ped = data.target ? data.target.id : source;

    console.log('pedi vastaus', ped, data, source);

    emitNet('jeffe-admin:teleportPlayer:client', ped, {
      ped,
      data: {
        ...data,
      },
    });

    cb({ ok: true }, source);
  }

  async handleKick(data: {target: any, reason: string}, cb: (callbackData: any, source: number) => void) {
    const { reason, target } = data;
    // todo: perms
    const player = target.id;
    DropPlayer(player, reason);

    cb({ ok: true }, source);
  }
}

export default ServerClientManager;
