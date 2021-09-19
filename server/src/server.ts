import { WeaponHash } from 'fivem-js';
import * as Cfx from 'fivem-js';
import { onNetPromise } from '../../shared/events';
import { parsePlayerIdentifiers } from './utils';

console.log('Hello from server');

onNetPromise('jeffe-admin:test', (data, cb) => {
  console.log('serveri dataa', data);
  cb({ ok: true });
});

onNetPromise('jeffe-admin:test3', (data, cb) => {
  console.log('serveri dataa', data);
  cb({ ok: false });
});

onNetPromise('jeffe-admin:hasPermissions', (data: any, cb: (returnData: any) => void) => {
  // TODO: PERMS

  const identifiers = parsePlayerIdentifiers(getPlayerIdentifiers(source));
  if ((identifiers as any).steam === '1100001115acb3c') {
    return cb({ ok: true });
  }

  return cb({ ok: false });
});

onNetPromise('jeffe-admin:giveWeapon', (data: {weaponHash: string, bullets: number, target?: {id: string}}, cb) => {
  console.log(data.target);
  const ped = data.target ? GetPlayerPed(data.target.id) : source;
  console.log(ped, data.weaponHash, Number(data.bullets), false, false);
  GiveWeaponToPed(ped, data.weaponHash, Number(data.bullets), false, false);

  cb({ ok: true });
});

onNetPromise('jeffe-admin:getPlayers', (data, cb) => {
  console.time('players');
  const players = getPlayers();
  const p = players.map((player) => ({
    id: player,
    name: GetPlayerName(player),
    guid: GetPlayerGuid(player),
    identifiers:
      parsePlayerIdentifiers(getPlayerIdentifiers(player)),
  }));

  console.timeEnd('players');

  // console.log('serveri dataa', p);
  cb({ ok: true, players: p });
});
