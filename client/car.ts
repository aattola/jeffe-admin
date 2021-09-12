import * as Cfx from 'fivem-js';
import { Model } from 'fivem-js';
import { CarPayload } from '../shared/types';


RegisterNuiCallbackType('car');

class CarManager {
  protected static instance: CarManager;
  lastCar: Cfx.Vehicle | null = null;

  static getInstance(): CarManager {
    if (!CarManager.instance) {
      CarManager.instance = new CarManager();
    }

    return CarManager.instance;
  }

  constructor() {
    on('__cfx_nui:car', (data: CarPayload, cb: (responseData: any) => void) => this.handleCar(data, cb));

    this.lastCar = null;
  }

  async handleCar(
    data: CarPayload,
    cb: (responseData: any) => void
  ): Promise<void> {
    function returnError(error: string) {
      cb({ ok: false, error });
    }

    if (data.type === 'spawn') {
      if (!data.model) return returnError('No model found');

      const ped = new Cfx.Ped(PlayerPedId());
      const model = new Model(data.model);
      const positionArray = GetOffsetFromEntityInWorldCoords(
        PlayerPedId(),
        0.0,
        4.0,
        0.5
      );

      const position = new Cfx.Vector3(
        positionArray[0],
        positionArray[1],
        positionArray[2]
      );

      const safeCoord = GetSafeCoordForPed(
        position.x,
        position.y,
        position.z,
        true,
        1
      );

      let safePosition: Cfx.Vector3 = position;

      if (safeCoord[0]) {
        if (data.safeSpawn) {
          safePosition = new Cfx.Vector3(
            safeCoord[1][0],
            safeCoord[1][1],
            safeCoord[1][2]
          );
        }
      }

      const vehicle = await Cfx.World.createVehicle(
        model,
        safePosition,
        ped.Heading
      );

      if (data.varit) {
        if (data.varit[0]) {
          const { r, g, b } = data.varit[0].rgb;
          SetVehicleCustomPrimaryColour(vehicle.Handle, r, g, b);
        }

        if (data.varit[1]) {
          const { r, g, b } = data.varit[1].rgb;
          SetVehicleCustomSecondaryColour(vehicle.Handle, r, g, b);
        }
      }

      this.lastCar = vehicle;
      cb({ ok: true });
    }

    if (data.type === 'seat') {
      const ped = new Cfx.Ped(PlayerPedId());
      if (!this.lastCar) return returnError('No car found');

      ped.setIntoVehicle(this.lastCar, Cfx.VehicleSeat.Driver);
      cb({ ok: true });
    }

    if (data.type === 'delete') {
      // const ped = new Cfx.Ped(PlayerPedId());
      if (!this.lastCar) return returnError('No car found');

      this.lastCar.delete();
      cb({ ok: true });
    }

    if (data.type === 'fix') {
      const ped = new Cfx.Ped(PlayerPedId());

      if (!IsPedInAnyVehicle(ped.Handle, false))
        return returnError('No vehicle found');

      const vehicle = GetVehiclePedIsIn(ped.Handle, false);
      SetVehicleEngineOn(vehicle, true, true, false);
      SetVehicleFixed(vehicle);
      cb({ ok: true });
    }

    if (data.type === 'clean') {
      const ped = new Cfx.Ped(PlayerPedId());
      if (!IsPedInAnyVehicle(ped.Handle, false))
        return returnError('No vehicle found');

      const vehicle = GetVehiclePedIsIn(ped.Handle, false);
      SetVehicleDirtLevel(vehicle, 0);

      cb({ ok: true });
    }
  }
}

export default CarManager;
