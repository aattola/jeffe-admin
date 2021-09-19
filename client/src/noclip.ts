import { menuOpen, SendReactMessage, toggleNuiFrame } from './menuState';

RegisterNuiCallbackType('toggleNoclip');

class NoclipManager {
  protected static instance: NoclipManager;

  noclip = false

  noclipEntity = 0

  speed = 0.0

  lastSpeed = 0.0

  controls = {
    toggle: 'DELETE',
    changeSpeed: 'LSHIFT',
    camMode: 'H',
    goUp: 85, // Q
    goDown: 48, // Z
    turnLeft: 34, // A
    turnRight: 35, // D
    goForward: 32, // W
    goBackward: 33, // S
    goRight: 30, // D
    goLeft: 34, // A
    pageUp: 207, // A
    pageDown: 208, // A
    shift: 21,
  }

  offsets = {
    y: 0.5, // Forward and backward movement speed multiplier
    z: 0.2, // Upward and downward movement speed multiplier
    x: 0.2, // Upward and downward movement speed multiplier
    h: 3, // Rotation movement speed multiplier
  }

  static getInstance(): NoclipManager {
    if (!NoclipManager.instance) {
      NoclipManager.instance = new NoclipManager();
    }

    return NoclipManager.instance;
  }

  constructor() {
    on('__cfx_nui:toggleNoclip', (data: any, cb: (responseData: any) => void) => this.toggleNoclip(data, cb));

    RegisterCommand(
      'devnoclip',
      () => {
        this.toggleNoclip(null, () => null);
      },
      false,
    );

    setTick(() => this.noclipTick());
  }

  noclipTick() {
    if (this.noclip) {
      DisableAllControlActions(0);
      EnableControlAction(0, 1, true);
      EnableControlAction(0, 2, true);

      let xOff = 0.0;
      let yOff = 0.0;
      let zOff = 0.0;

      if (IsDisabledControlPressed(0, this.controls.goRight)) {
        xOff = this.offsets.x;
      }

      if (IsDisabledControlPressed(0, this.controls.goLeft)) {
        xOff = -this.offsets.x;
      }

      if (IsDisabledControlPressed(0, this.controls.goForward)) {
        yOff = this.offsets.y;
      }

      if (IsDisabledControlPressed(0, this.controls.goBackward)) {
        yOff = -this.offsets.y;
      }

      if (IsDisabledControlPressed(0, this.controls.goUp)) {
        zOff = this.offsets.z;
      }

      if (IsDisabledControlPressed(0, this.controls.goDown)) {
        zOff = -this.offsets.z;
      }

      if (IsDisabledControlJustPressed(0, this.controls.shift)) {
        this.lastSpeed = this.speed;
        this.speed = 5;
        SendReactMessage('setNoclip', { noclip: true, speed: this.speed, zoom: true });
      }

      if (IsDisabledControlJustReleased(0, this.controls.shift)) {
        this.speed = this.lastSpeed;
        SendReactMessage('setNoclip', { noclip: true, speed: this.speed, zoom: false });
      }

      if (IsDisabledControlJustReleased(0, this.controls.pageUp)) {
        this.speed -= 0.5;
        SendReactMessage('setNoclip', { noclip: true, speed: this.speed });
      }

      if (IsDisabledControlJustReleased(0, this.controls.pageDown)) {
        this.speed += 0.5;
        SendReactMessage('setNoclip', { noclip: true, speed: this.speed });
      }

      const newPos = GetOffsetFromEntityInWorldCoords(
        this.noclipEntity,
        xOff * (this.speed + 0.3),
        yOff * (this.speed + 0.3),
        zOff * (this.speed + 0.3),
      );
      const heading = GetEntityHeading(this.noclipEntity);

      SetEntityVelocity(this.noclipEntity, 0.0, 0.0, 0.0);
      SetEntityRotation(this.noclipEntity, 0.0, 0.0, 0.0, 0, false);
      SetEntityRotation(
        this.noclipEntity,
        GetGameplayCamRelativePitch(),
        0, GetGameplayCamRelativeHeading(),
        1,
        false,
      );

      SetEntityCoordsNoOffset(this.noclipEntity, newPos[0], newPos[1], newPos[2], true, true, true);

      SetLocalPlayerVisibleLocally(true);
    }
  }

  toggleNoclip(
    data: any,
    cb: (responseData: any) => void,
  ): void {
    function returnError(error: string) {
      cb({ ok: false, error });
    }

    if (!this.noclip) {
      if (IsPedInAnyVehicle(PlayerPedId(), false)) {
        this.noclipEntity = GetVehiclePedIsIn(PlayerPedId(), false);
      } else {
        this.noclipEntity = PlayerPedId();
      }

      SetEntityAlpha(this.noclipEntity, 51, false);

      if (this.noclipEntity === PlayerPedId()) {
        SetEntityAlpha(PlayerPedId(), 51, false);
      } else {
        ResetEntityAlpha(this.noclipEntity);
        if (this.noclipEntity !== PlayerPedId()) {
          ResetEntityAlpha(PlayerPedId());
        }
      }
    } else {
      ResetEntityAlpha(PlayerPedId());
    }

    SendReactMessage('setNoclip', { noclip: !this.noclip, speed: this.speed });
    SetEntityCollision(this.noclipEntity, this.noclip, this.noclip);
    FreezeEntityPosition(this.noclipEntity, !this.noclip);
    SetEntityInvincible(this.noclipEntity, !this.noclip);
    SetEntityVisible(this.noclipEntity, this.noclip, !this.noclip);
    SetEveryoneIgnorePlayer(PlayerPedId(), !this.noclip);
    SetPoliceIgnorePlayer(PlayerPedId(), !this.noclip);

    this.noclip = !this.noclip;

    console.log('toggle noclip');

    return cb({ ok: true });
  }
}

export default NoclipManager;
