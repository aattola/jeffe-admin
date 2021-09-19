import { menuOpen, toggleNuiFrame } from './menuState';
import { emitNetPromise } from '../../shared/events';

RegisterNuiCallbackType('getTargets');

RegisterCommand(
  'getplayers',
  () => {
    emitNetPromise('jeffe-admin:getPlayers')
      .then((r) => console.log('returnattu dataa', r))
      .catch((e) => console.log(e));
  },
  false,
);

class MenuManager {
  protected static instance: MenuManager;

  static getInstance(): MenuManager {
    if (!MenuManager.instance) {
      MenuManager.instance = new MenuManager();
    }

    return MenuManager.instance;
  }

  constructor() {
    on('__cfx_nui:getTargets', (data: any, cb: (responseData: any) => void) => this.getTargets(data, cb));
  }

  async getTargets(
    data: any,
    cb: (responseData: any) => void,
  ): Promise<void> {
    function returnError(error: string) {
      cb({ ok: false, error });
    }

    const returnedData: any = await emitNetPromise('jeffe-admin:getPlayers')
      .catch((e) => console.log('playerget failed', e));

    const { players } = returnedData;

    cb({ ok: true, players });
  }
}

export default MenuManager;
