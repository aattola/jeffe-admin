import { makeAutoObservable } from 'mobx';
import makeInspectable from 'mobx-devtools-mst';

class OpenStateStore {
  isOpen: boolean = false

  constructor() {
    makeAutoObservable(this);
  }
}

const openState = new OpenStateStore();
makeInspectable(OpenStateStore);
export default openState;
