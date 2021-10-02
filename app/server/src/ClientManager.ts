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

  async handleTeleport(data: {target: any}, cb: (callbackData: any) => void) {
    // todo: perms
    const ped = data.target ? data.target.id : source;

    emitNet('jeffe-admin:teleportPlayer:client', ped, {
      ped,
      data: {
        ...data,
      },
    });

    cb({ ok: true });
  }

  async handleKick(data: {target: any, reason: string}, cb: (callbackData: any) => void) {
    const { reason, target } = data;
    // todo: perms
    const player = target.id;
    DropPlayer(player, reason);

    cb({ ok: true });
  }
}

export default ServerClientManager;
