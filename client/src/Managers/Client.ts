/* eslint-disable prefer-const,no-await-in-loop,max-len */
import { emitNetPromise } from '../../../shared/events';
import { Delay } from '../../../shared/functions';

RegisterNuiCallbackType('kickPlayer');
RegisterNuiCallbackType('teleportPlayer');

class ClientManager {
  protected static instance: ClientManager;

  static getInstance(): ClientManager {
    if (!ClientManager.instance) {
      ClientManager.instance = new ClientManager();
    }

    return ClientManager.instance;
  }

  constructor() {
    on('__cfx_nui:kickPlayer', (data: any, cb: (responseData: any) => Promise<void>) => this.handleKick(data, cb));
    on('__cfx_nui:teleportPlayer', (data: any, cb: (responseData: any) => Promise<void>) => this.requestTeleport(data, cb));
    onNet('jeffe-admin:teleportPlayer:client', (data: any) => this.handleTeleport(data));

    RegisterCommand(
      'devcoords',
      () => {
        const ped = GetPlayerPed(-1);
        const [playerX, playerY, playerZ] = GetEntityCoords(ped, false);
        const abo = GetEntityHeightAboveGround(
          ped,
        );

        console.log(`${playerX}, ${playerY}, ${playerZ}`);
        console.log(abo);
      },
      false,
    );
  }

  async teleport(ped: number, x: number, y: number, z: number, safe = false): Promise<void> {
    RequestCollisionAtCoord(x, y, z);
    while (!HasCollisionLoadedAroundEntity(ped)) {
      await Delay(500);
    }
    for (let i = 1000 - 1; i >= 0; i--) {
      SetPedCoordsKeepVehicle(ped, x, y, i);
      const heightAboveGround = GetEntityHeightAboveGround(ped);
      if (heightAboveGround < 6) {
        break;
      }
    }
  }

  private async safeTeleport(ped: number, x: any, y: any, z: any) {
    SetPedCoordsKeepVehicle(ped, x, y, 1000);

    const [_, groundZ] = GetGroundZFor_3dCoord(x, y, z, false);

    RequestCollisionAtCoord(x, y, groundZ);
    while (!HasCollisionLoadedAroundEntity(ped)) {
      await Delay(500);
    }
    SetPedCoordsKeepVehicle(ped, x, y, groundZ);
  }

  async handleTeleport(
    data: { data: { to: {x: string, y: string; z: string} | string ; safeTp: boolean; }; ped: number; },
  ): Promise<void> {
    console.log('teleportataan', data.data.to);
    const ped = GetPlayerPed(GetPlayerFromServerId(data.ped));
    if (typeof data.data.to !== 'string' && data.data.to.x) {
      let { x, y, z } = data.data.to;

      if (data.data.safeTp) {
        await this.safeTeleport(ped, parseFloat(x), parseFloat(y), parseFloat(z));
        return;
      }

      await this.teleport(ped, parseFloat(x), parseFloat(y), parseFloat(z), data.data.safeTp);
    } else if (data.data.to === 'waypoint') {
      const WaypointHandle = GetFirstBlipInfoId(8);
      if (!DoesBlipExist(WaypointHandle)) return;
      const [x, y, z] = GetBlipInfoIdCoord(WaypointHandle);
      await this.teleport(ped, x, y, z, false);
    } else if (parseFloat(<string>data.data.to)) {
      const toPed = GetPlayerPed(GetPlayerFromServerId(parseFloat(<string>data.data.to)));

      let [x, y, z] = GetEntityCoords(toPed, false);
      if (data.data.safeTp) {
        await this.safeTeleport(ped, x, y, z);
        return;
      }

      await this.teleport(ped, x, y, z, data.data.safeTp);
    }
  }

  async requestTeleport(
    data: any,
    cb: (responseData: any) => Promise<void>,
  ): Promise<void> {
    await emitNetPromise('jeffe-admin:teleportPlayer', { ...data });

    cb({ ok: true });
  }

  async handleKick(
    data: any,
    cb: (responseData: any) => Promise<void>,
  ): Promise<void> {
    const resp = await emitNetPromise('jeffe-admin:kickPlayer', { target: data.target, reason: data.reason });
    cb({ ok: true, resp });
  }
}

export default ClientManager;
