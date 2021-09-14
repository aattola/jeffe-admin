import * as Cfx from 'fivem-js';

RegisterNuiCallbackType('setWeather');
on(
  '__cfx_nui:setWeather',
  async (data: { weather?: Cfx.Weather }, cb: (responseData: any) => void) => {
    // debugPrint('Data sent by React', json.encode(data));

    if (!data.weather) return cb({ ok: false });

    // @ts-ignore
    Cfx.World.transitionToWeather(Cfx.Weather[data.weather], 5);

    return cb({ ok: true });
  },
);
