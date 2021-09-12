import * as Cfx from 'fivem-js';

RegisterNuiCallbackType('setTime');
on(
  '__cfx_nui:setTime',
  async (data: { time: Date }, cb: (responseData: any) => void) => {
    const aika = new Date(data.time);

    const hours = aika.getHours();
    const minutes = aika.getMinutes();

    if (hours > 23)
      return cb({ ok: false, error: 'Hours over 23 will crash game' });
    if (hours > 60)
      return cb({ ok: false, error: 'Minutes over 60 will crash game' });
    NetworkOverrideClockTime(hours, minutes, 0);

    cb({ ok: true, hours, minutes });
  }
);
