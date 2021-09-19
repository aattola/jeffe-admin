import { WeaponHash } from 'fivem-js';
import { menuOpen, toggleNuiFrame } from './menuState';
import { emitNetPromise } from '../../shared/events';

RegisterNuiCallbackType('giveWeapon');

class WeaponManager {
  protected static instance: WeaponManager;

  static getInstance(): WeaponManager {
    if (!WeaponManager.instance) {
      WeaponManager.instance = new WeaponManager();
    }

    return WeaponManager.instance;
  }

  constructor() {
    on('__cfx_nui:giveWeapon', (data: any, cb: (responseData: any) => void) => this.getTargets(data, cb));
  }

  async getTargets(
    data: {bullets: number, weaponHash: string, target?: { id: number }},
    cb: (responseData: any) => void,
  ): Promise<void> {
    function returnError(error: string) {
      cb({ ok: false, error });
    }

    if (data.bullets < 1) return returnError('Enemmän ammuksia nyt retu');
    console.log(data);

    const returnedData: any = await emitNetPromise('jeffe-admin:giveWeapon', { bullets: data.bullets, weaponHash: data.weaponHash, target: data.target })
      .catch((e) => console.log('giveweapon failed', e));

    // const { players } = returnedData;
    // if (!returnedData.ok) return returnError('Ei oikeuksia');
    // console.log('ON OIKEUDET');

    return cb({ ok: true, returnedData });
  }
}

export default WeaponManager;
