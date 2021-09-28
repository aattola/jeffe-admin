import { WeaponHash } from 'fivem-js';
import * as Cfx from 'fivem-js';
import { onNetPromise } from '../../shared/events';
import { parsePlayerIdentifiers } from './utils';
import ServerClientManager from './ClientManager';

console.log('Hello from server');
const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

ServerClientManager.getInstance();

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

onNetPromise('jeffe-admin:giveWeapon', (data: {weaponHash: string, bullets: number, target?: {id: number}}, cb) => {
  const ped = data.target ? data.target.id : source;

  emitNet('jeffe-admin:giveWeapon:client', ped, {
    ped,
    weapon: data.weaponHash,
    bullets: Number(data.bullets),
    isHidden: false,
    forceInHand: false,
  });

  cb({ ok: true });
});

// TODO: PERMS

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

  cb({ ok: true, players: p, youAreThisGuidSmile: GetPlayerGuid(String(source)) });
});

onNetPromise('jeffe-admin:toggleNoclip', (data, cb) => {
  const ped = data.target ? data.target.id : source;
  emitNet('jeffe-admin:toggleNoclip:client', ped, {
    ped,
  });

  cb({ ok: true });
});

// todo: ban tarkastus

interface Deferrals {
  defer: () => void
  done: (failureReason?: string) => void
  handover: (data: any) => void
  presentCard: (card: any, cb?: (data: any, rawData: string) => void) => void
  update: (message: string) => void
}

on('playerConnecting',
  async (
    playerName: string,
    setKickReason:
      (reason: string) => void,
    deferrals: Deferrals,
    source: string,
  ) => {
  // Code that gets executed once the event is triggered goes here.

    deferrals.defer();

    await Delay(50);

    deferrals.update('Loading');

    await Delay(2000);

    deferrals.presentCard({
      type: 'AdaptiveCard',
      body: [
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Image',
                  url: 'https://fi.wizcase.com/wp-content/uploads/2020/06/fortnite-logo.jpg',
                },
              ],
            },
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'TextBlock',
                  text: 'Bruh dude\nDude bruh\n\nBruh',
                  wrap: true,
                  fontType: 'Monospace',
                  size: 'Small',
                  weight: 'Lighter',
                  isSubtle: true,
                },
              ],
            },
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'Input.Number',
                  placeholder: 'Huutis',
                  id: 'input',
                },
                {
                  type: 'Input.Toggle',
                  title: 'Toggle se on',
                  id: 'toggle',
                },
                {
                  type: 'Input.Time',
                  id: 'date',
                },
                {
                  type: 'Input.ChoiceSet',
                  choices: [
                    {
                      title: 'Cock',
                      value: 'Cock',
                    },
                    {
                      title: 'Yep',
                      value: 'Yep',
                    },
                  ],
                  placeholder: 'Valitse tost',
                  id: 'select',
                },
                {
                  type: 'ActionSet',
                  actions: [
                    {
                      type: 'Action.Submit',
                      title: 'Submit this shit',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.2',
    }, (data) => {
      console.log('LOGIN DATA', data);

      deferrals.done();
    });
  });
