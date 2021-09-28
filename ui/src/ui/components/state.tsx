import { atom, selector } from 'recoil';
import React from 'react';

function Errori() {
  return (
    <div>
      <h1>Error tuli och meni</h1>
    </div>
  );
}

const openState = atom({
  key: 'openState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const debug = atom({
  key: 'debug', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const errorState = atom({
  key: 'errorState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const secondMenu = atom({
  key: 'secondMenu', // unique ID (with respect to other atoms/selectors)
  default: { open: false, components: [] }, // default value (aka initial value)
});

const notificationState = atom({
  key: 'notificationState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const shouldMenuBeOpen = selector({
  key: 'shouldSecondMenuBeOpen',
  get: ({ get }) => {
    const isErrors = get(errorState);
    const isForced = get(secondMenu);
    if (isErrors) {
      return { open: true, components: [Errori], title: 'Error' };
    }

    if (isForced.open) {
      return { open: true, components: isForced.components };
    }

    return { open: false };
  },
  set: ({ set }, newValue) => {
    const value = newValue as boolean;
    set(secondMenu, { open: value, components: [] });
    set(errorState, value);
  },
});

export {
  openState,
  errorState,
  secondMenu,
  shouldMenuBeOpen,
  notificationState,
  debug,
};
