let menuOpen = false;

function SendReactMessage(action: string, data: any): void {
  // eslint-disable-next-line no-undef
  SendNUIMessage({
    action,
    data,
  });
}

function toggleNuiFrame(open: boolean): void {
  menuOpen = open;
  // eslint-disable-next-line no-undef
  SetNuiFocus(open, open);
  SendReactMessage('setVisible', open);
}

export { menuOpen, toggleNuiFrame, SendReactMessage };
