const asyncWrapper = async (promise: any) => {
  try {
    const data = await promise;
    if (!data.ok) {
      throw data;
    }
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};

export default asyncWrapper;
