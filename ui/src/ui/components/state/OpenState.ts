import { makeAutoObservable } from 'mobx';

class OpenStateStore {
  isOpen: boolean = false

  isDebugOpen: boolean = false

  constructor() {
    makeAutoObservable(this);
  }
}

const openState = new OpenStateStore();
export default openState;
