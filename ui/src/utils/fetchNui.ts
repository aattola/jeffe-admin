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
  eventName: string,
  data?: any
): Promise<T> {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'nui-frame-app';

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  const respFormatted = await resp.json().catch((err) => {
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
      data,
      response: msg,
      error: true,
    });

    // @ts-ignore
    window.debugRequests = requestCopy2;

    // @ts-ignore
    console.log(window.debugRequests, requestCopy2);
    return msg;
  });

  // @ts-ignore
  const requestCopy = [...window.debugRequests];
  requestCopy.push({
    resourceName,
    eventName,
    data,
    response: respFormatted,
    error: false,
  });

  // @ts-ignore
  window.debugRequests = requestCopy;

  return respFormatted;
}
