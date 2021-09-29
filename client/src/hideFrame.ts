import { toggleNuiFrame } from './menuState';

RegisterNuiCallbackType('hideFrame');
on('__cfx_nui:hideFrame', (_: any, cb: (returnData: any) => void) => {
  toggleNuiFrame(false);
  cb({ ok: true });
});
