function emitNetPromise(resource: string, data?: any, timeout = 2500) {
  const [res, event] = resource.split(':');
  const newEvent = `INTERNAL_SERVER_${event}`;
  const eventName = `${res}:${newEvent}`;
  return new Promise((resolve, reject) => {
    const newEventClient = `INTERNAL_CLIENT_${event}`;
    const eventNameListen = `${res}:${newEventClient}`;

    const timeoutHandle = setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        error: 'REQUEST timeout',
        debug: {
          resource,
          eventNameListen,
          newEventClient,
          eventName,
        },
      });
    }, timeout);

    function handleEvent(returnData: any) {
      clearTimeout(timeoutHandle);
      // eslint-disable-next-line no-restricted-globals
      removeEventListener(eventNameListen, handleEvent);

      if (returnData.ok === false) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ ok: false, error: returnData.error });
      }

      resolve(returnData);
    }

    onNet(eventNameListen, handleEvent);
    emitNet(eventName, data);
  });
}

function onNetPromise(
  eventName: string, callback: (data: any, cb: (returnData: any, source: number) => void, source: number) => void,
) {
  const [res, event] = eventName.split(':');

  const correctEventName = `${res}:INTERNAL_SERVER_${event}`;
  const correctReturnEventName = `${res}:INTERNAL_CLIENT_${event}`;

  onNet(correctEventName, (returnData: any[]) => {
    callback(returnData, (data: any, source?: number) => {
      emitNet(correctReturnEventName, source, data);
    }, source);
  });
}

export { emitNetPromise, onNetPromise }
