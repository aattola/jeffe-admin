import Cfx from 'fivem-js';
import { emitNetPromise } from '@jeffe/shared/events';
import { menuOpen, toggleNuiFrame } from '../menuState';

RegisterNuiCallbackType('giveWeapon');
RegisterNuiCallbackType('removeWeapons');

class WeaponManager {
  protected static instance: WeaponManager;

  static getInstance(): WeaponManager {
    if (!WeaponManager.instance) {
      WeaponManager.instance = new WeaponManager();
    }

    return WeaponManager.instance;
  }

  constructor() {
    on('__cfx_nui:giveWeapon', (data: any, cb: any) => this.giveWeapon(data, cb));
    on('__cfx_nui:removeWeapons', (data: any, cb: any) => this.removeWeapons(data, cb));
    onNet('jeffe-admin:giveWeapon:client', (data: any) => this.giveWeaponClient(data));
  }

  giveWeaponClient(data: any): void {
    console.log(data);
    console.log(GetPlayerPed(GetPlayerFromServerId(data.ped)), GetPlayerPed(-1), data.weapon);
    // const pedi = new Cfx.Ped(GetPlayerPed(GetPlayerFromServerId(data.ped)));
    // console.log(pedi);
    // pedi.giveWeapon(data.weapon, data.bullets, data.isHidden, data.forceInHand);
    // GiveWeaponToPed(GetPlayerFromServerId(data.ped), parseInt(data.weapon, 16), data.bullets, data.isHidden, data.forceInHand);
    const ped = GetPlayerPed(GetPlayerFromServerId(data.ped));
    const hash = parseInt(data.weapon, 16);
    const ammo = data.bullets;
    GiveWeaponToPed(ped, hash, ammo, false, false);
  }

  removeWeapons(data: {target?: { id: number }}, cb: (data: any) => void) {
    // TODO: tee valmiiksi
    RemoveAllPedWeapons(GetPlayerPed(-1), true);
  }

  async giveWeapon(
    data: {bullets: number, weaponHash: string, target?: { id: number }},
    cb: (responseData: any) => void,
  ): Promise<void> {
    function returnError(error: string) {
      cb({ ok: false, error });
    }

    if (data.bullets < 1) return returnError('Enemmän ammuksia nyt retu');
    // console.log(data);

    const returnedData: any = await emitNetPromise('jeffe-admin:giveWeapon', { bullets: data.bullets, weaponHash: data.weaponHash, target: data.target })
      .catch((e) => console.log('giveweapon failed', e));

    // const { players } = returnedData;
    // if (!returnedData.ok) return returnError('Ei oikeuksia');
    // console.log('ON OIKEUDET');

    return cb({ ok: true, returnedData });
  }
}

export default WeaponManager;
