import { toJS } from 'mobx';
import menuState from '../components/state/MenuState';

type EventName = {resource: string; eventName: string} | string

function resolveResourceName(eventName: EventName) {
  if (typeof eventName !== 'string') {
    return eventName.resource;
  }
  return (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'nui-frame-app';
}

/**
 * Simple wrapper around fetch API tailored for CEF/NUI use. This abstraction
 * can be extended to include AbortController if needed or if the response isn't
 * JSON. Tailor it to your needs.
 *
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */

export async function fetchNui<T = any>(
  eventName: EventName,
  data?: any,
): Promise<T> {
  let reqData = { ...data };
  if (menuState.target?.name) {
    reqData = {
      ...reqData,
      target: toJS(menuState.target),
    };
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(reqData),
  };

  const resourceName = resolveResourceName(eventName);

  try {
    const resp = await fetch(`https://${resourceName}/${eventName}`, options);

    const respFormatted = await resp.json();

    // @ts-ignore
    const requestCopy = [...window.debugRequests];
    requestCopy.push({
      resourceName,
      eventName,
      data: reqData,
      response: respFormatted,
      error: false,
    });

    // @ts-ignore
    window.debugRequests = requestCopy;

    return respFormatted;
  } catch (err) {
    const msg = {
      error: true,
      err,
      errorMsgForDev: `YOU PROBABLY FORGOT TO EXECUTE CB FUNCTION OR REGISTER EVENT: ${eventName}`,
    };

    // @ts-ignore
    const requestCopy2 = [...window.debugRequests];
    requestCopy2.push({
      resourceName,
      eventName,
      data: reqData,
      response: msg,
      error: true,
    });

    // @ts-ignore
    window.debugRequests = requestCopy2;

    // @ts-ignore
    throw new Error(JSON.stringify(msg));
    // return msg;
  }
}
